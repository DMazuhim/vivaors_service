const experienceIntegration = require('./placesIntegration');
const { mapDynamicZone } = require('../../helpers/componentMapper');

module.exports = {
  async fetchPlaces() {
    const integrationResponse = await experienceIntegration.fetchPlaces();
    const places = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];

    const experiences = places.map(place => this.parsePlaceToExperience(place));

    await Promise.all(
      experiences.map(async (experience) => {
        try {
          await strapi.entityService.create('api::experience.experience', {
            data: experience,
          });

          console.log(`✅ Experiência criada com sucesso: ${experience.title || experience.slug}`);
        } catch (error) {
          let errorMessage = error.message;

          if (error.details?.errors) {
            errorMessage = error.details.errors
              .map((err) => `${err.path.join('.')} ${err.message}`)
              .join('; ');
          }
          if (errorMessage.includes('must be one of the following values')) {
            console.warn(`⚠️ Campo inválido detectado em "${experience.title || experience.slug}". Limpando campo problemático...`);
            if (errorMessage.includes('tier')) experience.tier = '';
            if (errorMessage.includes('relevance')) experience.relevance = null;
            if (errorMessage.includes('seo')) experience.seo = null;

            try {
              await strapi.entityService.create('api::experience.experience', {
                data: experience,
              });
              console.log(`✅ Experiência criada (com campos vazios): ${experience.title || experience.slug}`);
              return;
            } catch (retryError) {
              console.error(`❌ Ainda falhou ao criar "${experience.title || 'Desconhecida'}" após limpeza: ${retryError.message}`);
            }
          } else {
            console.error(`❌ Falha ao criar experiência "${experience.title || 'Desconhecida'}": ${errorMessage}`);
          }
        }
      })
    );
  },

  parsePlaceToExperience(place) {
    return {
      id: place?.id,
      title: place?.name,
      slug: place?.slug,
      address: place?.address,
      lat: place?.lat,
      lng: place?.lng,
      placeGoogleId: place?.placeGoogleId,
      description: place?.description,
      tier: place?.tier,
      tagline: place?.tagline,
      relevance: place?.relevance,
      seo: place?.seo,
      locations: (place?.locations || []).map(location => location.id),
      categories: (place?.categories || []).map(category => category.id),
      tags: (place?.tags || []).map(tag => tag.id),
      /*coverDesktop: place?.coverDesktop,
      coverMobile: place?.coverMobile,
      gallery: place?.gallery,*/
      components: mapDynamicZone(place?.components),
      publishedAt: place?.publishedAt || new Date(),
    };
  },
};
