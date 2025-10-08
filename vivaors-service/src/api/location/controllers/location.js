"use strict";

const { factories } = require('@strapi/strapi');

const { createCoreController } = factories;

module.exports = createCoreController("api::location.location", ({ strapi }) => ({
  async importLocations() {
    return strapi.service("api::location.location").importLocations();
  }
}));
