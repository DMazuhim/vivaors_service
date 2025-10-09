"use strict";

const { factories } = require('@strapi/strapi');

const { createCoreController } = factories;

module.exports = createCoreController("api::page.page", ({ strapi }) => ({
  async importPages() {
    return strapi.service("api::page.page").importPages();
  }
}));
