const axios = require('axios');

const headers = { headers: { Authorization: process.env.OLD_VIVA_TOKEN } };
const url = process.env.OLD_VIVA;

class locationsIntegration {
  static async fetchLocations() {
    try {
      const fullUrl = `${url}/locations?populate=*&pagination[pageSize]=100`;
      const response = await axios.get(fullUrl, headers);
      return response.data;
    } catch (error) {
      integrationError({ origin: 'GET LOCATIONS', error });
    }
  }
}

module.exports = locationsIntegration