const routes = require('next-routes')();

routes
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/new', '/campaigns/new')
module.exports = routes