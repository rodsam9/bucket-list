const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validation = require('../middleware/validate');

const userStory = require('../models/userStory');

routes.get('/', (req, res) => {
    const results = connect.getCollection().find();

    results.toArray().then((lists, err) => {
        if (err) {
            res.status(400).json({
                message: err
            });
        }
        res.status(200).json(lists);
        console.log(`Returned All Contacts`);
    });
});
routes.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to get user contact info.');
    }
    const contactId = new ObjectId(req.params.id);
    const results = connect.getCollection().find({
        _id: contactId
    });

    results.toArray().then((lists, err) => {
        if (err) {
            res.status(400).json({
                message: err
            });
        }
        res.status(200).json(lists);
        console.log(`Returned Contact ${req.params.id}`);
    });
});

routes.post('/', (req, res) => {

    const contactInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        birthday: req.body.birthday,
        hobbies: req.body.hobbies,
        fears: req.body.fears
    };

    const response = connect.getCollection().insertOne(contactInfo);
    if (response) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occured when trying to add contact info.');
    }
});

routes.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update user contact info.');
    }
    const contactId = new ObjectId(req.params.id);
    const contactInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        birthday: req.body.birthday,
        hobbies: req.body.hobbies,
        fears: req.body.fears
    };

    const response = connect.getCollection().replaceOne({ _id: contactId }, contactInfo);
    if (response) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occured when trying to update contact info.');
    }
});

routes.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete user contact info.');
    }
    const contactId = new ObjectId(req.params.id);
    const response = connect.getCollection().deleteOne({ _id: contactId }, true);
    if (response) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occured when trying to delete contact info.');
    }
});


module.exports = routes;