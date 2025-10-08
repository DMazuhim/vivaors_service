"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const categoriesService = require("../../integrations/categoriesServices")

module.exports = createCoreService("api::category.category", ({ strapi }) => ({
  async importCategories() {
    const categories = await categoriesService.fetchCategories();

    return categories;
  }
}));
