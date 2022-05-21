const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

routes.get('/', (req, res) => {
    const results = connect.getCollection().find();

    results.toArray().then((lists) => {
        res.status(200).json(lists);
        console.log(`Returned All Bucket List Activities`);
    });
});


module.exports = routes;