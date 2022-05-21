const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send("Hello");
})

module.exports = routes;