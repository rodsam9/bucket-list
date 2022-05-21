// .env
const dotenv = require('dotenv');
dotenv.config();

//database
const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;
//let _collectionTwo;

const initDb = () => {

    MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
        if (err) throw err;
        _client = client;
        _collection = client.db("bucket-list").collection("contact");
        //_collectionTwo = client.db("bucket-list").collection("bucket");

        console.log("Db Connected Successfully")
    });
};
const getCollection = () => {
    return _collection;
};







module.exports = { initDb, getCollection };