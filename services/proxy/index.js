const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = express();

app.use(express.static('public'));

app.use(cors());

const authProxy = proxy(`http://localhost:${process.env.AUTH_PORT}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/auth${req.url}`;
    }
});

const eventsProxy = proxy(`http://localhost:${process.env.EVENTS_PORT}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/events${req.url}`;
    }
});

const usersProxy = proxy(`http://localhost:${process.env.USERS_PORT}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/users${req.url}`;
    }
});

const uploadProxy = proxy(`http://localhost:${process.env.UPLOAD_PORT}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/upload${req.url}`;
    }
});

app.use('/api/v1/auth', authProxy);
app.use('/api/v1/events', eventsProxy);
app.use('/api/v1/users', usersProxy);
app.use('/api/v1/upload', uploadProxy);

app.listen(process.env.PROXY_PORT, (error) => {
    if (error) return console.log(error);
    console.log('Proxy started on port ' + process.env.PROXY_PORT);
});

