const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get('/users', function(req, res) {
    knex('users')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'no here'
            })
        );
});

app.get('/items', function(req, res) {
    knex('items')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'no here'
            })
        );
});


app.get('/', (req, res) => {
    res.send('App is up and running.')
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
});