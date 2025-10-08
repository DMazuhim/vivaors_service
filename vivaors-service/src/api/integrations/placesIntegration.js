const axios = require('axios');

const headers = { headers: { Authorization: `Bearer ${process.env.OLD_VIVA_KEY}` } };
const url = process.env.OLD_VIVA;

class placesIntegration {
  static async fetchPlaces() {
      const fullUrl = `${url}/places?populate=*&pagination[pageSize]=1000`;
      const response = await axios.get(fullUrl, headers);
      return response.data;
  }
}

module.exports = placesIntegration;