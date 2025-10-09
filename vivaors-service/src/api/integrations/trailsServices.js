const contentIntegration = require('./trailsIntegration');
const { mapDynamicZone } = require('../../helpers/componentMapper');

module.exports = {
  async fetchTrails() {
    const integrationResponse = await contentIntegration.fetchTrails();
    const trails = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];

    const contents = trails.map(trail => this.parseTrailToContent(trail));

    await Promise.all(
      contents.map(async (content) => {
        try {
          await strapi.entityService.create('api::content.content', {
            data: content,
          });

          console.log(`✅ Experiência criada com sucesso: ${content.title || content.slug}`);
        } catch (error) {
          let errorMessage = error.message;

          if (error.details?.errors) {
            errorMessage = error.details.errors
              .map((err) => `${err.path.join('.')} ${err.message}`)
              .join('; ');
          }

          console.error(`❌ Falha ao criar experiência "${content.title || 'Desconhecida'}": ${errorMessage}`);
        }
      })
    );
  },

  parseTrailToContent(trail) {
    return {
      id: trail?.id,
      documentId:trail?.documentId,
      titlle:trail?.titlle,
      slug:trail?.slug,
      description:trail?.description,
      resume:trail?.resume,
      readTime:trail?.readTime,
      editorSignature:trail?.editorSignature,
      createdAt:trail?.createdAt,
      updatedAt:trail?.updatedAt,
      seo: trail?.seo,
      locations: (trail?.locations || []).map(location => location.id),
      categories: (trail?.categories || []).map(category => category.id),
      tags: (trail?.tags || []).map(tag => tag.id),/*
      coverDesktop: trail?.coverDesktop,
      coverMobile: trail?.coverMobile,
      gallery: trail?.gallery,*/
      components: mapDynamicZone(trail?.components),
      publishedAt: trail?.publishedAt || new Date(),
    };
  },
};
