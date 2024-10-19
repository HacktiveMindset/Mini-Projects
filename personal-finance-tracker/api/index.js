const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let finances = []; // This should ideally connect to a database.

app.get('/api/finances', (req, res) => {
    res.json(finances);
});

app.post('/api/finances', (req, res) => {
    const finance = req.body;
    finances.push(finance);
    res.status(201).send(finance);
});

module.exports = app;
