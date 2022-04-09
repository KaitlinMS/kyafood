// This is the entry point for our whole application

const express = require('express');
const {request, response} = require("express");
const app = express();

let count = 0;

app.get('/', (request, response) => {
    // Someone has accessed the server from a browser, so we can display some static content for them.

    count++;

    response.send('Hello world! Count: ' + count.toString());
});

app.get('/cat/:id', (req, res) => {
    // Return the cat's info
    // The goal will be to read this from some sort of database.

    const hopperData = {
        'cat': req.params['id'],
        'weight_history': [
            { weight: 11, date: '2022-04-04'},
            { weight: 11.2, date: '2022-03-31'}
        ]
    };

    // Send the data as JSON
    res.json(hopperData);
})

app.listen(8000, () => {
    console.log('Server has started!');
});