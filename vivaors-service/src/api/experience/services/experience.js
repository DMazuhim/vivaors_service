"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const placesIntegration = require("../../../integrations/placesIntegration");

module.exports = createCoreService("api::place.place", ({ strapi }) => ({
  async importPlaces() {
    const places = await placesIntegration.fetchPlaces();

    return places;
  }
}));
