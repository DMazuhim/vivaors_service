const Meilisearch = require('strapi-plugin-meilisearch/server/services/meilisearch/client.js');
const INDEX_CONFIG = {
  CATEGORY: {
    populate: ['type'],
    displayedAttributes: ['id', 'title', 'type', 'slug'],
    searchableAttributes: ['title', 'type'],
    filterableAttributes: ['id', 'title', 'type'],
    sortableAttributes: ['title', 'type'],
  },
  CLIENT: {
    populate: [
      'products.name',
      'products.slug',
      'products.id',
      'products.categories',
      'places.name',
      'places.id',
      'places.city',
      'places.route',
      'places.region',
      'places.country',
      'moods',
      'gallery'
    ],
    displayedAttributes: ['products', 'places', 'moods', 'gallery'],
    searchableAttributes: ['products.name', 'places.name', 'moods.name'],
    filterableAttributes: ['products.categories', 'places.id', 'places.city', 'places.region', 'places.country'],
    sortableAttributes: [],
  },
  LOCATION: {
    populate: [
      'type',
      'coverDesktop',
      'coverMobile',
      'locations',
    ],
    displayedAttributes: ['name', 'type', 'label', 'tagline', 'description', 'places', 'seo'],
    searchableAttributes: ['name', 'places.name', 'seo.keywords', 'locale', 'relevance'],
    filterableAttributes: ['id', '_geo', 'guides', 'trails', 'locations', 'type', 'slug', 'description', 'name', 'isContent', 'locale', 'relevance', 'isFirstLevel'],
    sortableAttributes: ['name', '_geo', 'createdAt', 'publishedAt', 'tier', 'locale', 'relevance'],
  },
  PLACE: {
    indexName: 'place',
    populate: [
      'coverDesktop',
      'coverMobile',
      'logo',
      'gallery',
      'region',
      'route',
      'country',
      'city',
      'neighborhood',
      'products.name',
      'products.slug',
      'products.id',
      'products.categories',
      'moods.id',
      'moods.name',
      'moods.icon',
      'client.id',
      'client.name',
      'client.slug',
      'seo.keywords',
    ],
    displayedAttributes: ['id', 'name', 'description', 'locale', 'slug', 'type', 'tagline', '_geo', 'relevance', 'soldTickets', 'tier', 'coverDesktop', 'coverMobile', 'gallery', 'locations', 'client', 'region', 'route', 'country', 'city', 'neighborhood'],
    searchableAttributes: ['name', 'tagline', 'type', 'locale', 'relevance', 'seo.keywords', 'locations.name'],
    filterableAttributes: ['id', '_geo', 'locale', 'locations.id', 'locations.name', 'type'],
    sortableAttributes: ['name', '_geo', 'createdAt', 'publishedAt', 'soldTickets', 'relevance', 'tier'],
  },
  PRODUCT: {
    populate: [
      'categories.id',
      'categories.name',
      'categories.type',
      'type.dates',
      'places.name',
      'coverDesktop',
      'coverMobile',
      'daysWeek',
      'places.id',
      'places.moods',
      'places.city',
      'places.route',
      'places.region',
      'places.country',
      'productStatus',
      'gallery',
      'partnerPlatform',
      'seo.keywords',
      'cities',
      'routes',
      'neighborhoods',
    ],
    displayedAttributes: ['title', 'places.name', 'places.id', 'places.city', 'places.route', 'places.region', 'places.country', 'price', 'id', 'slug', 'isActive', 'showPlace', 'type', 'numberOfPeople', 'coverDesktop', 'coverMobile', 'daysWeek', 'productType', 'soldTickets', '_geo', 'locations', 'productStatus', 'gallery', 'categories.title', 'smallTitle', 'partnerPlatform.platform', 'categories.type',],
    searchableAttributes: ['title', 'places.name', 'locations.name', 'price', 'categories.title', 'categories.type', 'description', 'locale',],
    filterableAttributes: ['id', '_geo', 'categories.id', 'categories.title', 'isActive', 'locations.id', 'locations.name', 'places.id', 'places.name', 'price', 'productType', 'type',],
    sortableAttributes: ['_geo', 'createdAt', 'price', 'soldTickets', 'title'],
  },
  TRAIL: {
    populate: [
      'type',
      'coverDesktop',
      'coverMobile',
      'coverCard',
      'places.name',
      'places.id',
      'places.moods',
      'places.city',
      'places.route',
      'places.region',
      'places.country',
      'moods.title',
      'seo.keywords',
      'categories.id',
      'categories.name',
      'cities.id',
      'cities.name',
      'routes.id',
      'routes.name',
      'region.id',
      'region.name',
      'country.id',
      'country.name',
    ],
    displayedAttributes: ['title', 'slug', 'id', 'coverDesktop', 'coverMobile', 'coverCard', 'type', 'locale', 'seo.keywords', 'categories', 'locations',],
    searchableAttributes: ['title', 'description', 'locations.name', 'locale', 'seo.keywords', 'products.name', 'places.name', 'categories.name'],
    filterableAttributes: ['id', 'title', 'locale', 'locations.id', 'locations.name', 'moods.id', 'trails.id', 'type', 'categories.id', 'categories.name'],
    sortableAttributes: ['createdAt', 'locale', 'title', '_geo'],
  },
};


module.exports = {
  INDEX_CONFIG,

  async getMeilisearchClient() {
    const store = strapi.plugin('meilisearch').service('store');
    const { apiKey, host } = await store.getCredentials();
    const client = Meilisearch({ apiKey, host });
    return client;
  },

  async updateMeilisearchIndex({ id, updatedEntity, indexToUpdate }) {
    try {
      const entities = await strapi.db.query(`api::${indexToUpdate}.${indexToUpdate}`).findMany({
        select: ['id'],
        where: {
          [updatedEntity]: {
            id: {
              $eq: id
            }
          },
          publishedAt: { $notNull: true }
        },
      });
      this.updateIndex({ index: indexToUpdate, entities });
    } catch (error) {
      console.log('ERRO ->: ', error);
    }
  },

  async updateProductIndexByLocation(id) {
    try {
      const products = await strapi.db.query('api::product.product').findMany({
        select: ['id', 'title'],
        where: {
          $or: [
            {
              cities: {
                id: {
                  $eq: id
                },
              }
            },
            {
              routes: {
                id: {
                  $eq: id
                },
              }
            },
            {
              neighborhoods: {
                id: {
                  $eq: id
                },
              }
            },
            {
              region: {
                id: {
                  $eq: id
                },
              }
            },
            {
              country: {
                id: {
                  $eq: id
                },
              }
            }
          ],
          publishedAt: { $notNull: true }
        },
      });
      this.updateIndex({ index: 'product', entities: products });
    } catch (error) {
      console.log('ERRO ->: ', error);
    }
  },

  async updatePlaceIndexByLocation(id) {
    try {
      const places = await strapi.db.query('api::place.place').findMany({
        select: ['id', 'name'],
        where: {
          $or: [
            {
              city: {
                id: {
                  $eq: id
                },
              }
            },
            {
              route: {
                id: {
                  $eq: id
                },
              }
            },
            {
              neighborhood: {
                id: {
                  $eq: id
                },
              }
            },
            {
              region: {
                id: {
                  $eq: id
                },
              }
            },
            {
              country: {
                id: {
                  $eq: id
                },
              }
            }
          ],
          publishedAt: { $notNull: true }
        },
      });
      this.updateIndex({ index: 'place', entities: places });
    } catch (error) {
      console.log('ERRO ->: ', error);
    }
  },

  async updateIndex({ index, entities }) {
    if (entities) {
      let count = 0;
      for (const entity of entities) {
        await strapi.entityService.update(`api::${index}.${index}`, entity.id, { data: { publishedAt: null, updated_by_id: process.env.MEILISEARCH_USER } });
        await strapi.entityService.update(`api::${index}.${index}`, entity.id, { data: { publishedAt: new Date(), updated_by_id: process.env.MEILISEARCH_USER } });
        count++;
        if (count % 3 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
      console.log(`Total de ${index}s relacionados: ${entities.length}, total atualizados: `, count);
    }
  },
  // async updateEntries({ index, entries }) {
  //   try {
  //     // File reference node_modules/strapi-plugin-meilisearch/server/services/meilisearch/connector.js
  //     const meilisearch = strapi.plugin('meilisearch').service('meilisearch')
  //     await meilisearch.updateEntriesInMeilisearch({ contentType: `api::${index}.${index}`, entries })
  //     console.log(`Total index updated [${entries.length}]`);
  //   } catch (error) {
  //         console.log(`Error to update meilisearch entries ${error}`, error);
  //     }
  // },
  async updateEntries({ index, entries, listSizePerDocument }) {
    try {
      entries = this.parseMeilisearchFormat({ index, entries });
      const batches = this.splitIntoBatches({ entries, listSizePerDocument });
      await this.processBatches({ index, batches });

      strapi.log.info(`Total index ${index} updated [${entries.length}]`);
    } catch (error) {
      console.log(`Error to update meilisearch entries ${error}`, error);
    }
  },

  parseMeilisearchFormat({ index, entries }) {
    return entries.map(item => {
      return {
        ...item,
        _meilisearch_id: `${index}-${item.id}`
      };
    });
  },

  splitIntoBatches({ entries, listSizePerDocument }) {
    const batches = [];
    let count = 0;

    while (count < entries.length) {
      const batch = entries.slice(count, count + listSizePerDocument);
      batches.push(batch);
      count += listSizePerDocument;
    }

    return batches;
  },

  async waitProccessTask({ taskUid, client }) {
    const maxRetries = 10;

    for (let retries = 0; retries < maxRetries; retries++) {
      const task = await client.getTask(taskUid);

      strapi.log.info(`Meilisearch consult task ${taskUid} status: ${task.status}`);

      if (task.status !== 'enqueued' && task.status !== 'processing') {
        return task;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error(`Task ID: ${taskUid} did not complete in time.`);
  },

  async processBatches({ index, batches }) {
    const client = await this.getMeilisearchClient();

    for (const batch of batches) {
      const task = await client.index(index).updateDocuments(batch, { primaryKey: '_meilisearch_id' });

      if (task) {
        strapi.log.info(`Meilisearch task ID: ${task.taskUid} ${task.status}, ${batch.length} ${index} submitted for update`);
        const taskResult = await this.waitProccessTask({ taskUid: task.taskUid, client });
        strapi.log.info(`Meilisearch task ID: ${taskResult.uid} ${taskResult.status}, ${batch.length} ${index} updated!`);
      }
    }
  },

  async search({ index, query = '', params = {} }) {
    const client = await this.getMeilisearchClient();
    const searchResult = await client.index(index).search(query, params);
    return searchResult;
  },

  buildFiltersForSearch({ filteredProducts, referenceProducts }) {

    const idsFilter = `id IN [${filteredProducts.map(product => product.id).join(',')}]`;
    const uniqueCityIds = [
      ...new Set(referenceProducts.results.flatMap(product => product.places ?? [])
        .map(place => place.city?.id).filter(Boolean)
      )
    ];
    const citiesFilter = `locations.id IN [${uniqueCityIds.join(',')}]`;

    return [
      'isActive = true',
      citiesFilter,
      idsFilter
    ];
  },

  cleanImageObject(image) {
    if (!image || !image.formats) return null;

    return {
      url: image.url || null,
      mediumUrl: image.formats?.medium?.url || null,
      smallUrl: image.formats?.small?.url || null,
      thumbUrl: image.formats?.thumbnail?.url || null,
      largeUrl: image.formats?.large?.url || null,
      alternativeText: image.alternativeText || null,
      width: image.width || null,
      height: image.height || null
    };
  },

  cleanLocationObject(locations) {
    if (!Array.isArray(locations)) return {
      id: locations.id || null,
      name: locations.name || null,
      slug: locations.slug || null,
      type: locations.type || null
    };

    return locations.map(location => ({
      id: location.id || null,
      name: location.name || null,
      slug: location.slug || null,
      type: location.type || null
    }));
  }
};
