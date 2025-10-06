const { POPULATE_AND_FIELDS_PRODUCTS } = require('../helpers/populateEntitiesHelper');
module.exports = {

  async validateSeo(modelName, data, event) {
    const seoTitle = await strapi.db.connection('components_meta_seos').select('title').where({ id: data.seo.id });

    if (seoTitle && seoTitle.length > 0) {
      const titleToVerify = seoTitle[0].title;
      const query = { where: { seo: { title: titleToVerify } }, populate: ['seo'] };

      if (event === 'beforeUpdate') query.where.id = { $ne: data.id };

      const exists = await strapi.db.query(`api::${modelName}.${modelName}`).findMany(query);

      if (exists.length > 0) {
        console.log(`VALIDATION SEO ERROR - ${modelName} with field seo.title exists:`, exists);
        await this.lifecycleErrorHandler({ errors: [{ path: ['seo.title'], message: `O título do SEO deve ser único.` }] });
      }
    }
  },

  async validateUniqueFields({ modelName, action, data, fields }) {
    const query = { where: { locale: data.locale }, select: ['slug', 'locale', 'id'], populate: { localizations: true } };
    for (const field of fields) {
      query.where[field] = data[field];
      if (action === 'beforeUpdate') query.where.id = { $ne: data.id };

      const exists = await strapi.db.query(`api::${modelName}.${modelName}`).findMany(query);

      if (exists && exists.length > 0) {
        console.log(`VALIDATION FIELDS ERROR - ${modelName} with field ${field} exists:`, exists);
        await this.lifecycleErrorHandler({ errors: [{ path: [field], message: `O campo ${field} deve ser único.` }] });
      }
    }
    return data;
  },

  async setLocaleToSEO(seoId, locale) {
    if (seoId) {
      const seo = await strapi.entityService.findOne('meta.seo', seoId);
      if (seo?.title) {
        seo.title = seo.title.endsWith(`- ${locale}`) ? seo.title : `${seo.title} - ${locale}`;
        await strapi.entityService.update('meta.seo', seoId, { data: seo });
      }
    }
  },

  pinMapInfo(data) {
    if (data.pin) {
      const [lat, lng] = data.pin.split(',').map(coord => parseFloat(coord.trim()));
      if (lat && lng) {
        data.lat = lat;
        data.lng = lng;
      }
    }
    return data;
  },

  async validateRelations(modelName, data, id) {
    if (process.env.PROJECT === 'winelocals' && data.publishedAt !== null) {
      console.log('vai validar...');
      switch (modelName) {
        case 'product':
          return this.validateProducts(data, id);
        case 'place':
          return this.validatePlaces(data, id);
        case 'tour':
          return this.validateTours(data, id);
        case 'macro-region':
          return this.validateMacroRegions(data, id);
      }
    }
    return;
  },

  async validateProducts(data, id) {
    const product = await strapi.entityService.findOne('api::product.product', id, {
      populate: {
        places: {
          select: ['id']
        },
        type: POPULATE_AND_FIELDS_PRODUCTS.populate.type,
      }
    });
    if (data.publishedAt) {
      const errors = [];
      if (!product.places || product.places.length === 0) {
        errors.push({ path: ['places'], message: 'O produto deve ter pelo menos um PLACE vinculado.' });
      }
      if (!product.type[0]?.__component) {
        errors.push({ path: ['type', 0], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.', name: "ValidationError" });
        return this.lifecycleErrorHandler({ errors, message: 'Por favor valide os campos obrigatorios!' });
      }

      const typeData = product.type[0];

      switch (typeData.__component) {
        case 'experience-type.combo':
          if (!typeData.single || typeData.single.length === 0)
            errors.push({ path: ['type', 0, 'single', 0], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.' });
          else if (typeData.single && typeData.single.length > 0) {
            typeData.single.forEach((item, position) => {
              if (!item.tour) errors.push({ path: ['type', 0, 'single', position, 'tour'], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.' });
            });
          }
          break;
        case 'experience-type.flex':
          if (!typeData.tours || typeData.tours.length === 0) {
            errors.push({ path: ['type', 0, 'tours'], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.', name: "ValidationError" });
          }
          break;
        default:
          if (!typeData.tour)
            errors.push({ path: ['type', 0, 'tour'], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.', name: "ValidationError" });
          break;
      }

      if (errors.length > 0) {
        return this.lifecycleErrorHandler({ errors, message: 'Por favor valide os campos obrigatorios!' });
      }
    }

    if (product.publishedAt) await this.validatePublishedProducts(data, product);
  },

  async validatePublishedProducts(data, product) {
    const errors = [];
    if (data?.places?.connect?.length === 0 && data?.places?.disconnect?.length === product?.places?.length) {
      errors.push({ path: ['places'], message: 'O produto deve ter pelo menos um PLACE vinculado.' });
    }
    if (!data.type[0]?.__component) {
      errors.push({ path: ['type', 0], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.', name: "ValidationError" });
    }

    const typeData = data.type[0];

    const component = await strapi.entityService.findOne(`${typeData.__component}`, typeData.id, { populate: POPULATE_AND_FIELDS_PRODUCTS.populate.type.populate });

    switch (typeData.__component) {
      case 'experience-type.combo':
        if (!component.single || component.single.length === 0)
          errors.push({ path: ['type', 0, 'single', 0], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.' });
        else if (component.single && component.single.length > 0) {
          component.single.forEach((item, position) => {
            if (!item.tour) errors.push({ path: ['type', 0, 'single', position, 'tour'], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.' });
          });
        }
        break;
      case 'experience-type.flex':
        if (!component.tours || component.tours.length === 0) {
          errors.push({ path: ['type', 0, 'tours'], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.', name: "ValidationError" });
        }
        break;
      default:
        if (!component.tour)
          errors.push({ path: ['type', 0, 'tour'], message: 'O produto deve ter pelo menos uma EXPERIÊNCIA vinculada.', name: "ValidationError" });
        break;
    }

    if (errors.length > 0) {
      return this.lifecycleErrorHandler({ errors, message: 'Por favor valide os campos obrigatorios!' });
    }
  },

  async validatePlaces(data, id) {
    const errors = [];
    const place = await strapi.entityService.findOne('api::place.place', id, {
      populate: { city: { select: ['id'] }, country: { select: ['id'] }, region: { select: ['id'] }, },
    });

    const isPublishing = data.publishedAt != null && !place.publishedAt;
    const isUpdatingPublishedPlace = place.publishedAt && data.publishedAt !== null;

    if (isPublishing || isUpdatingPublishedPlace) {
      if (!place.country && (!data?.country?.connect || data.country.connect.length === 0)) {
        errors.push({ path: ['country'], message: 'O place deve ter pelo menos um PAÍS vinculado.' });
      }
      if (!place.city && (!data?.city?.connect || data.city.connect.length === 0)) {
        errors.push({ path: ['city'], message: 'O place deve ter pelo menos uma CIDADE vinculada.' });
      }
      if (!place.region && (!data?.region?.connect || data.region.connect.length === 0)) {
        errors.push({ path: ['region'], message: 'O place deve ter pelo menos uma REGIÃO vinculada.' });
      }
    }

    if (errors.length > 0) return this.lifecycleErrorHandler({ errors, message: 'Por favor, valide os campos obrigatórios!' });
  },


  async validateTours(data, id) {
    const tour = await strapi.entityService.findOne('api::tour.tour', id, {
      populate: { partnerPlatform: { select: ['id'] }, place: { select: ['id'] } },
    });

    const errors = [];
    const isPublishing = data.publishedAt != null && !tour.publishedAt;
    const isUpdatingPublishedTour = tour.publishedAt && data.publishedAt !== null;

    if (isPublishing || isUpdatingPublishedTour) {
      if (!tour.partnerPlatform && (!data?.partnerPlatform?.connect || data?.partnerPlatform?.connect?.length === 0)) {
        errors.push({ path: ['partnerPlatform'], message: 'A tour deve ter um PARCEIRO.' });
      }

      if (!tour.place && (!data?.place?.connect || data?.place?.connect?.length === 0)) {
        errors.push({ path: ['place'], message: 'A tour deve ter um PLACE.' });
      }

      if (!tour.commission && !data.commission) {
        errors.push({ path: ['commission'], message: 'A tour deve ter uma COMISSÃO.' });
      }

      if (!tour.partnerTourId && !data.partnerTourId) {
        errors.push({ path: ['partnerTourId'], message: 'A tour deve ter um ID DO PARCEIRO.' });
      }
    }

    if (errors.length > 0) {
      return this.lifecycleErrorHandler({
        errors,
        message: 'Por favor, valide os campos obrigatórios!',
      });
    }
  },

  async validateMacroRegions(data, id) {
    const macroRegion = await strapi.entityService.findOne('api::macro-region.macro-region', id, {
      populate: { locations: { select: ['id'] } },
    });

    const errors = [];
    const isPublishing = data.publishedAt != null && !macroRegion.publishedAt;
    const isUpdatingPublishedMacroRegion = macroRegion.publishedAt && data.publishedAt !== null;

    if (isPublishing || isUpdatingPublishedMacroRegion) {
      if (data?.locations?.connect.length === 0 || !data?.locations?.connect) {
        if (!macroRegion.locations || macroRegion.locations.length === 0) {
          errors.push({
            path: ['locations'],
            message: 'A macro-região deve ter pelo menos uma LOCATION vinculada.',
          });
        }
      }
    }

    if (errors.length > 0) {
      return this.lifecycleErrorHandler({
        errors,
        message: 'Por favor, valide os campos obrigatórios!',
      });
    }
  },


  async validateEventWeekdayConflict(data) {
    const typeComponent = data.type?.[0];
    if (!typeComponent || typeComponent.__component !== 'experience-type.event') return;
    const type = await strapi.entityService.findOne('experience-type.event', data.type[0].id, { populate: ['dates'] });

    const daysWeek = data.daysWeek?.length;
    const dates = type.dates || [];
    const uniqueDates = dates.filter(
      (currentDate, currentIndex, allDates) =>
        allDates.findIndex(dateObj => dateObj.date === currentDate.date) === currentIndex
    );

    const hasDuplicates = uniqueDates.length !== dates.length;

    if (hasDuplicates) {
      await strapi.entityService.update('experience-type.event', type.id, {
        data: { dates: uniqueDates.map(dateObj => ({ id: dateObj.id, date: dateObj.date })) }
      });
      type.dates = uniqueDates;
    }

    if (type.dates.length > 2 && daysWeek > 0) {
      return this.lifecycleErrorHandler({
        errors: [
          { path: ['daysWeek'], message: 'O campo "Quando acontece?" não pode ser preenchido com eventos de várias datas' }
        ],
        message: 'Erro de validação: daysWeek'
      });
    }
  },

  async lifecycleErrorHandler({ errors, message }) {
    const ctx = strapi.requestContext.get();
    ctx.throw(400, {
      details: { errors },
      message: message,
      name: "ValidationError"
    });
    return ctx;
  },


processDaysWeek(daysWeek) {
  if (!Array.isArray(daysWeek)) return daysWeek;

  const allDays = ['segunda,', 'terça,', 'quarta,', 'quinta,', 'sexta,', 'sabado,', 'domingo,'];

  return allDays.every(day => daysWeek.includes(day))
    ? ['diariamente,']
    : daysWeek;
}
};