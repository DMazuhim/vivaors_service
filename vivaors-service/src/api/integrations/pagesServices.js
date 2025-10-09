const pageIntegration = require('./pagesIntegration');
const { mapDynamicZone } = require('../../helpers/componentMapper');

module.exports = {
  async fetchPages() {
    const integrationResponse = await pageIntegration.fetchPages();
    const pages = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];

    const pagesToCreate = pages.map(page => this.parsePage(page));

    await Promise.all(
      pagesToCreate.map(async (page) => {
        try {
          await strapi.entityService.create('api::page.page', { data: page });
          console.log(`✅ Experiência criada com sucesso: ${page.title || page.slug}`);
        } catch (error) {
          let errorMessage = error.message;

          if (error.details?.errors) {
            errorMessage = error.details.errors
              .map((err) => `${err.path.join('.')} ${err.message}`)
              .join('; ');
          }

          if (errorMessage.includes('must be one of the following values')) {
            console.warn(`⚠️ Campo inválido detectado em "${page.title || page.slug}". Limpando campo problemático...`);
            if (errorMessage.includes('type')) page.type = '';
            if (errorMessage.includes('locale')) page.locale = 'pt-BR';
            if (errorMessage.includes('seo')) page.seo = null;

            try {
              await strapi.entityService.create('api::page.page', { data: page });
              console.log(`✅ Experiência criada (com campos vazios): ${page.title || page.slug}`);
              return;
            } catch (retryError) {
              console.error(`❌ Ainda falhou ao criar "${page.title || 'Desconhecida'}" após limpeza: ${retryError.message}`);
            }
          } else {
            console.error(`❌ Falha ao criar experiência "${page.title || 'Desconhecida'}": ${errorMessage}`);
          }
        }
      })
    );
  },

  parsePage(page) {
    return {
      id: page?.id,
      title: page?.title,
      slug: page?.slug,
      type: page?.type,
      createdAt: page?.createdAt,
      updatedAt: page?.updatedAt,
      locale: page?.locale,
      seo: page?.seo,
      locations: (page?.locations || []).map(location => location.id),
      categories: (page?.categories || []).map(category => category.id),
      tags: (page?.tags || []).map(tag => tag.id),
      /*coverDesktop: page?.coverDesktop,
      coverMobile: page?.coverMobile,
      gallery: page?.gallery,*/
      components: mapDynamicZone(page?.components),
      publishedAt: page?.publishedAt || new Date(),
    };
  },
};
