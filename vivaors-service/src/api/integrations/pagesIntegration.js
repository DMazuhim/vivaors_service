const axios = require('axios');

const headers = { headers: { Authorization: `Bearer ${process.env.OLD_VIVA_KEY}` } };
const url = process.env.OLD_VIVA;

class pagesIntegration {
  static async fetchPages() {
      const fullUrl = `${url}/pages?populate=*&pagination[pageSize]=1000`;
      const response = await axios.get(fullUrl, headers);
      return response.data;
  }
}

module.exports = pagesIntegration;