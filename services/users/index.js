const express = require('express');
const userHandler = require('./userHandler');
const DB = require('../../packages/database/index');
const cors = require('cors');

const app = express();

DB.init();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/v1/users/get-user/:id', userHandler.getUser);

app.listen(process.env.USERS_PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server starting on port ${process.env.USERS_PORT}`);
});