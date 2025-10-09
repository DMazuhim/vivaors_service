//const helper = require('../src/helpers/helper');
// const meilisearchHelper = require('../src/helpers/meilisearchHelper');

module.exports = ({env}) => ({
    meilisearch: {
      config: {
        experience: {
          entriesQuery: {
            populate: ['categories'],
          },
          /* transformEntry({ entry }) {
             const lat = isNaN(entry.lat) ? 0.0 : parseFloat(entry.lat);
             const lng = isNaN(entry.lng) ? 0.0 : parseFloat(entry.lng);
             const locations = [];
 
             entry.coverDesktop = entry.coverDesktop && meilisearchHelper.cleanImageObject(entry.coverDesktop);
             entry.coverMobile = entry.coverMobile && meilisearchHelper.cleanImageObject(entry.coverMobile);
             entry.logo = entry.logo && meilisearchHelper.cleanImageObject(entry.logo);
             entry.gallery = entry.gallery?.map(img => meilisearchHelper.cleanImageObject(img));
 
             if (entry && entry.city && !locations.some(location => location.id === entry.city.id)) {
               const city = meilisearchHelper.cleanLocationObject(entry.city);
               locations.push(city);
               entry.city = city;
             }
             if (entry && entry.region && !locations.some(location => location.id === entry.region.id)) {
               const region = meilisearchHelper.cleanLocationObject(entry.region);
               locations.push(region);
               entry.region = region;
             }
             if (entry && entry.country && !locations.some(location => location.id === entry.country.id)) {
               const country = meilisearchHelper.cleanLocationObject(entry.country);
               locations.push(country);
               entry.country = country;
             }
             if (entry && entry.route && !locations.some(location => location.id === entry.route.id)) {
               const route = meilisearchHelper.cleanLocationObject(entry.route);
               locations.push(route);
               entry.route = route;
             }
            /* if (!entry.tagline) {
               const descriptionToSplit = helper.removeMarkdown(entry.description);
               entry.tagline = descriptionToSplit.split('.')[0] + '.';
             }
 
             return {
               ...entry,
               locations,
               _geo: { lat, lng }
             };
           },
           /*settings: {
             displayedAttributes: meilisearchHelper.INDEX_CONFIG.PLACE.displayedAttributes,
             searchableAttributes: meilisearchHelper.INDEX_CONFIG.PLACE.searchableAttributes,
             filterableAttributes: meilisearchHelper.INDEX_CONFIG.PLACE.filterableAttributes,
             sortableAttributes: meilisearchHelper.INDEX_CONFIG.PLACE.sortableAttributes,
           }*/
        },
      }

    },
})