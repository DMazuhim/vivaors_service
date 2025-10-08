const categoriesIntegration = require('./categoriesIntegration');

module.exports = {
  async fetchCategories() {
    const integrationResponse = await categoriesIntegration.fetchCategories();
    const categories = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];

    for (const category of categories) {
      try {
        await strapi.entityService.create('api::category.category', {
          data: category,
        });

        console.log(`✅ Categoria criada com sucesso: ${category.name || category.slug}`);
      } catch (error) {
        let errorMessage = error.message;

        if (error.details && error.details.errors) {
          errorMessage = error.details.errors
            .map((err) => `${err.path.join('.')} ${err.message}`)
            .join('; ');
        }

        console.error(`❌ Falha ao criar categoria "${category.name || 'Desconhecida'}": ${errorMessage}`);
      }
    }
  },
};
