const guideIntegration = require('./guidesIntegration');
const { mapDynamicZone } = require('../../helpers/componentMapper');

module.exports = {
  async fetchGuides() {
    const integrationResponse = await guideIntegration.fetchGuides();
    const guides = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];

    const guidesToCreate = guides.map(guide => this.parseGuide(guide));

    await Promise.all(
      guidesToCreate.map(async (guide) => {
        try {
          await strapi.entityService.create('api::guide.guide', { data: guide });
          console.log(`✅ Experiência criada com sucesso: ${guide.title || guide.slug}`);
        } catch (error) {
          let errorMessage = error.message;

          if (error.details?.errors) {
            errorMessage = error.details.errors
              .map((err) => `${err.path.join('.')} ${err.message}`)
              .join('; ');
          }

          if (errorMessage.includes('must be one of the following values')) {
            console.warn(`⚠️ Campo inválido detectado em "${guide.title || guide.slug}". Limpando campo problemático...`);
            if (errorMessage.includes('type')) guide.type = '';
            if (errorMessage.includes('locale')) guide.locale = 'pt-BR';
            if (errorMessage.includes('seo')) guide.seo = null;

            try {
              await strapi.entityService.create('api::guide.guide', { data: guide });
              console.log(`✅ Experiência criada (com campos vazios): ${guide.title || guide.slug}`);
              return;
            } catch (retryError) {
              console.error(`❌ Ainda falhou ao criar "${guide.title || 'Desconhecida'}" após limpeza: ${retryError.message}`);
            }
          } else {
            console.error(`❌ Falha ao criar experiência "${guide.title || 'Desconhecida'}": ${errorMessage}`);
          }
        }
      })
    );
  },

  parseGuide(guide) {
    return {

      id: guide?.id,
      label: guide?.label,
      title: guide?.title,
      subtitle: guide?.subtitle,
      slug: guide?.slug,
      createdAt: guide?.createdAt,
      updatedAt: guide?.updatedAt,
      publishedAt: guide?.publishedAt,
      locale: guide?.locale,
      seo: guide?.seo,
      locations: (guide?.locations || []).map(location => location.id),
      categories: (guide?.categories || []).map(category => category.id),
      tags: (guide?.tags || []).map(tag => tag.id),
      /*coverDesktop: guide?.coverDesktop,
      coverMobile: guide?.coverMobile,
      gallery: guide?.gallery,*/
      components: mapDynamicZone(guide?.components),
      publishedAt: guide?.publishedAt || new Date(),
    };
  },
};
