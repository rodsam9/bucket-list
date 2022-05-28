const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/contact', require('./contact'));
//routes.use('/bucket', require('./bucket'));

module.exports = routes;