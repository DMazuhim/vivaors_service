"use strict";

const { factories } = require('@strapi/strapi');

const { createCoreController } = factories;

module.exports = createCoreController("api::experience.experience", ({ strapi }) => ({
  async importPlaces(ctx) {
    return strapi.service("api::experience.experience").importPlaces(ctx);
  }
}));
