"use strict";

const { factories } = require('@strapi/strapi');

const { createCoreController } = factories;

module.exports = createCoreController("api::content.content", ({ strapi }) => ({
  async importContents() {
    return strapi.service("api::content.content").importContents();
  }
}));
