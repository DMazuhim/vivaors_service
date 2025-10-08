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

          console.error(`❌ Falha ao criar experiência "${experience.title || 'Desconhecida'}": ${errorMessage}`);
        }
      })
    );
  },

  parsePlaceToExperience(place) {
    return {
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
      coverDesktop: place?.coverDesktop,
      coverMobile: place?.coverMobile,
      gallery: place?.gallery,
      components: mapDynamicZone(place?.components),
      publishedAt: place?.publishedAt || new Date(),
    };
  },
};
