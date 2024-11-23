const express = require('express');
const eventHandler = require('./eventHandler');
const DB = require('../../packages/database/index');
const cors = require('cors');

const multer = require('multer');
const upload = multer();

const app = express();

DB.init();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/v1/events/get-all-events', eventHandler.getAllEvents);
app.get('/api/v1/events/get-event/:id', eventHandler.getSingleEvent);
app.post('/api/v1/events/create-event', upload.none(), eventHandler.createEvent);
app.delete('/api/v1/events/delete-event/:id', eventHandler.deleteEvent);
app.patch('/api/v1/events/update-event/:id', upload.none(), eventHandler.updateEvent);

app.listen(process.env.EVENTS_PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server starting on port ${process.env.EVENTS_PORT}`);
});

