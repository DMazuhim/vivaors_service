"use strict";

const { factories } = require('@strapi/strapi');

const { createCoreController } = factories;

module.exports = createCoreController("api::guide.guide", ({ strapi }) => ({
  async importGuides() {
    return strapi.service("api::guide.guide").importGuides();
  }
}));
