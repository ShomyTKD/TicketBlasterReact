const express = require('express');
const DB = require('../../packages/database/index');
const cors = require('cors');

const multer = require('./uploadHandler');

const app = express();

DB.init();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/v1/upload', multer.uploadImage, (req, res) => {
    res.send('File uploaded successfully');
});

app.listen(process.env.UPLOAD_PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server starting on port ${process.env.UPLOAD_PORT}`);
});

