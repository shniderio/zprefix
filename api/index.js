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
    try {
        const data = await knex('items')
            .join('users', 'items.user_id', '=', 'users.id')
            .select('items.*', 'users.username');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
    }
});

app.get("/items/user/:username", async (req, res) => {
    const { username } = req.params;
    console.log(`Fetching items for username: ${username}`);

    try {
        const user = await knex("users").where({ username }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const items = await knex("items").where({ user_id: user.id });
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching user items:", err);
        res.status(500).json({ message: "Error fetching user items", error: err.message });
    }
});

// Add stuff to make work
app.post('/items', async (req, res) => {
    try {
        const { username, item_name, description, quantity } = req.body;

        if (!username || !item_name || !description || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await knex('users').where({ username }).first();
        if (!user) return res.status(404).json({ error: "User not found" });

        const [newItem] = await knex('items').insert({
            user_id: user.id,
            item_name,
            description,
            quantity
        })
            .returning('*');

        res.status(201).json(newItem)
    } catch (err) {
        console.error("Database insert error:", err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

// Add stuff to make work
app.patch('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { item_name, description, quantity } = req.body;

    try {
        const [updatedItem] = await knex('items')
            .where({ id })
            .update({ item_name, description, quantity })
            .returning('*');

        if (!updatedItem) return res.status(404).json({ message: "No item here" });
        res.json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error again" });
    }
});

// Add stuff to make work
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await knex('items').where({ id }).del();
        if (!deleted) return res.status(404).json({ message: "Item no here" });
        res.json({ message: "Item deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Another database error you must figure out... again..."})
    }
});

app.get('/', (req, res) => {
    res.send('App is up and running.')
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
});