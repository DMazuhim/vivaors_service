"use strict";

const { createCoreService } = require("@strapi/strapi").factories;
const placesService = require("../../integrations/placesServices")

module.exports = createCoreService("api::experience.experience", ({ strapi }) => ({
  async importPlaces() {
    const places = await placesService.fetchPlaces();

    return places;
  }
}));
