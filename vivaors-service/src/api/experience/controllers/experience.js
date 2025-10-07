("use strict");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::experience.experience", ({ strapi }) => ({
  async importPlaces(ctx) {
    return strapi.service("api::experience.experience").importPlaces(ctx);
  }
}));
