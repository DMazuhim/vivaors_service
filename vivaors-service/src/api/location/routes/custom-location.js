module.exports = {
  routes : [
    {
      method: 'GET',
      path: '/locations/import-locations',
      handler: 'location.importLocations'
    },
  ],
};
