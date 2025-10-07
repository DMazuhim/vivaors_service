import axios from 'axios';

const headers = { headers: { Authorization: process.env.OLD_VIVA_TOKEN } };
const url = process.env.OLD_VIVA;

class placesIntegration {
  static async fetchPlaces() {
    try {
      const fullUrl = `${url}/places`;
      const response = await axios.get(fullUrl, headers);
      return response.data;
    } catch (error) {
      integrationError({ origin: 'GET SAMPLES', error });
    }
  }
}

export default placesIntegration;