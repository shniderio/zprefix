const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/users', function (req, res) {
    knex
        .select('*')
        .from('users')
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err))
});

app.get('/users/username/:username', (req, res) => {
    let queriedUsername = req.params.username
    console.log(queriedUsername)
    if (queriedUsername) {
        knex
            .select('*')
            .from('users')
            .where('users.username', '=', `${queriedUsername}`)
            .then((info) => res.status(200).send(info))
    } else {
        res.status(400).send('You must supply a username in the body of the request')
    }
})


app.post('/users', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    if (!first_name || !last_name || !username || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        
        const existingUser = await knex('users').where('username', username).first();
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const inserted = await knex('users').insert({
            first_name,
            last_name,
            username,
            password
        });

        return res.status(201).json({
            message: 'User created successfully',
            userId: inserted[0]
        });

    } catch (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ message: 'Database error', error: err.message });
    }
});


// Add stuff to make work
app.get('/items', async (req, res) => {
    // knex('items')
    //     .select('*')
    //     .then(data => res.status(200).json(data))
    //     .catch(err =>
    //         res.status(404).json({
    //             message:
    //                 'no here'
    //         })
    //     );
    try {
        const data = await knex('items')
            .join('users', 'items.user_id', '=', 'users.id')
            .select('items.*', 'users.username');
            res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Database error'});
    }
});

// Add stuff to make work
app.post('/items', (req, res) => {
    knex('items')
        .insert({})
        .then(() => {
            res.status(201)
            res.send('Updated')
        })
})

// Add stuff to make work
app.patch('/items', (req, res) => {
    knex('items')
        .where({})
        .update({})
        .then(() => {
            res.status(204)
            res.send('Patched')
        })
})

// Add stuff to make work
app.delete('/items', (req, res) => {
    knex('items')
        .where({})
        .del()
        .then(() => {
            res.status(200)
            res.send('Deleted')
        })
})

app.get('/', (req, res) => {
    res.send('App is up and running.')
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
});