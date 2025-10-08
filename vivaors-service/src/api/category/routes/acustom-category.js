module.exports = {
  routes : [
    {
      method: 'GET',
      path: '/categories/import-categories',
      handler: 'category.importCategories'
    },
  ],
};
