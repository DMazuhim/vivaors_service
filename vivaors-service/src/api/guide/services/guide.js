"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const guidesService = require("../../integrations/guidesServices")

module.exports = createCoreService("api::guide.guide", ({ strapi }) => ({
  async importGuides() {
    const guides = await guidesService.fetchGuides();

    return guides;
  }
}));
