"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const pagesService = require("../../integrations/pagesServices")

module.exports = createCoreService("api::page.page", ({ strapi }) => ({
  async importPages() {
    const pages = await pagesService.fetchPages();

    return pages;
  }
}));
