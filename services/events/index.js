const express = require('express');
const eventHandler = require('./eventHandler');
const DB = require('../../packages/database/index');
const cors = require('cors');

const multer = require('../upload/uploadHandler');

const app = express();

DB.init();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/v1/events/get-all-events', eventHandler.getAllEvents);
app.get('/api/v1/events/get-event/:id', eventHandler.getSingleEvent);
app.post('/api/v1/events/create-event', multer.uploadImage, eventHandler.createEvent);
app.delete('/api/v1/events/delete-event/:id', eventHandler.deleteEvent);
app.patch('/api/v1/events/update-event/:id', multer.uploadImage, eventHandler.updateEvent);

app.listen(process.env.EVENTS_PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server starting on port ${process.env.EVENTS_PORT}`);
});

