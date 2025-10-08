"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const locationsService = require("../../integrations/locationsServices")

module.exports = createCoreService("api::location.location", ({ strapi }) => ({
  async importLocations() {
    const locations = await locationsService.fetchLocations();

    return locations;
  }
}));
