const slugify = require('slugify');

module.exports = {
  integrationError({ origin, error }) {
    const errorFormat = {
      message: error.message,
      responseErrorCode: error.response?.data?.error?.name,
      responseErrorMessage: error.response?.data?.error?.message,
      response: {
        stauts: error.response?.status,
        statusMessage: error.response?.statusText,
        methodRequest: error.response?.config?.method,
        urlRequest: error.response?.config?.url,
        authorizationSend: error.response?.config?.headers?.Authorization,
        dataRequest: error.response?.config?.data
      },
      details: {
        data: error.response?.data?.data,
        error: error.response?.data?.error
      }
    };
    console.log(`${origin} ERROR:`, errorFormat);
  },
};
