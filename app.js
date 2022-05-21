const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const connect = require('./db/connect');


app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use((req, res, next) => {
        res.setHeader('Acces-Control-Allow-Origin', '*');
        next();
    });


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
