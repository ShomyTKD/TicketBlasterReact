const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('./authHandler');
const DB = require('../../packages/database/index');
const cors = require('cors');

const app = express();

DB.init();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.post('/api/v1/auth/signup', auth.signUp);
app.post('/api/v1/auth/login', auth.login);
app.get('/api/v1/auth/logout', auth.logout);

app.listen(process.env.AUTH_PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server starting on port ${process.env.AUTH_PORT}`);
});