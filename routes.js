const routes = require('next-routes');

module.exports = routes().add({ name: 'pricing', pattern: '/pricing', page: 'products/index' });
