const axios = require('axios');

const headers = { headers: { Authorization: process.env.OLD_VIVA_TOKEN } };
const url = process.env.OLD_VIVA;

class guidesIntegration {
  static async fetchGuides() {
    try {
      const fullUrl = `${url}/guides-v2?populate=*&pagination[pageSize]=100`;
      const response = await axios.get(fullUrl, headers);
      return response.data;
    } catch (error) {
      integrationError({ origin: 'GET GUIDES', error });
    }
  }
}

module.exports = guidesIntegration