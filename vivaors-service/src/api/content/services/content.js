"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const contentsService = require("../../integrations/trailsServices")

module.exports = createCoreService("api::content.content", ({ strapi }) => ({
  async importContents() {
    const contents = await contentsService.fetchTrails();

    return contents;
  }
}));
