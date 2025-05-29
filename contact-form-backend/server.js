const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const validator = require('validator');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: 'contact_form'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// POST route to save form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (name.length > 255 || email.length > 255) {
        return res.status(400).json({ error: 'Name or email too long' });
    }

    const query = 'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error saving to database:', err);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

// GET route to fetch all submissions
app.get('/api/contact', (req, res) => {
    const query = 'SELECT id, name, email, message FROM submissions';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.status(200).json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});