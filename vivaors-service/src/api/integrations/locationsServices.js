const locationsIntegration = require('./locationsIntegration');
const { mapDynamicZone } = require('../../helpers/componentMapper');

const parseLocation = (location) => {
  const parsedComponents = mapDynamicZone(location?.contents);

  const dataToCreate = {
    id: location?.id,
    name: location?.name,
    type: location?.type,
    lat: location?.lat,
    lng: location?.lng,
    slug: location?.slug,
    tagline: location?.tagline,
    pin: location?.pin,
    description: location?.description,/*
    bannerMobile: location?.bannerMobile,
    bannerDesktop: location?.bannerDesktop,*/
    components: parsedComponents,
    publishedAt: location?.publishedAt || new Date(),
  };

  delete dataToCreate.id;
  delete dataToCreate.created_at;
  delete dataToCreate.updated_at;
  delete dataToCreate.created_by_id;
  delete dataToCreate.updated_by_id;

  return dataToCreate;
};

module.exports = {
  parseLocation,

  async fetchLocations() {
    const integrationResponse = await locationsIntegration.fetchLocations();
    const locations = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];
    const locationsToCreate = locations.map(parseLocation);

    await Promise.all(
      locationsToCreate.map(async (locationData) => {
        try {
          await strapi.entityService.create('api::location.location', { data: locationData });
          console.log(`✅ Localização criada com sucesso: ${locationData.name || locationData.slug}`);
        } catch (error) {
          let errorMessage = error.message;

          if (error.details?.errors) {
            errorMessage = error.details.errors
              .map((err) => `${err.path.join('.')} ${err.message}`)
              .join('; ');
          }

          if (errorMessage.includes('must be one of the following values')) {
            if (errorMessage.includes('type')) locationData.type = '';
            try {
              await strapi.entityService.create('api::location.location', { data: locationData });
              console.log(`✅ Localização criada (com campos vazios): ${locationData.name || locationData.slug}`);
              return;
            } catch (retryError) {
              console.error(`❌ Ainda falhou ao criar "${locationData.name || 'Desconhecida'}" após limpeza: ${retryError.message}`);
            }
          } else {
            console.error(`❌ Falha ao criar localização "${locationData.name || 'Desconhecida'}": ${errorMessage}`);
          }
        }
      })
    );
  },
};
