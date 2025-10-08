const axios = require('axios');

const headers = { headers: { Authorization: process.env.OLD_VIVA_TOKEN } };
const url = process.env.OLD_VIVA;

class categoriesIntegration {
  static async fetchCategories() {
    try {
      const fullUrl = `${url}/categories`;
      const response = await axios.get(fullUrl, headers);
      return response.data;
    } catch (error) {
      integrationError({ origin: 'GET CATEGORIES', error });
    }
  }
}

module.exports = { categoriesIntegration }