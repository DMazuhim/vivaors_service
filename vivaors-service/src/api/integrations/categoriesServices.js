const categoriesIntegration = require('./categoriesIntegration.js');

module.exports = {
    async fetchCategories() {
        const integrationResponse = await categoriesIntegration.fetchCategories();
        const categories = Array.isArray(integrationResponse.data) ? integrationResponse.data : [];

        for (const category of categories) {
            await strapi.db.query('api::category.category').create({
                data: category
            });
        }
    }
};

