"use strict";

const { factories } = require('@strapi/strapi');

const { createCoreController } = factories;

module.exports = createCoreController("api::category.category", ({ strapi }) => ({
  async importCategories() {
    return strapi.service("api::category.category").importCategories();
  }
}));
