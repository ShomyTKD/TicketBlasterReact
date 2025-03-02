const express = require('express');
const userHandler = require('./userHandler');
const DB = require('../../packages/database/index');
const cors = require('cors');

const multer = require('../upload/uploadHandler');

const app = express();

DB.init();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/v1/users/get-all-users', userHandler.getUsers);
app.get('/api/v1/users/get-user/:id', userHandler.getUser);
app.patch('/api/v1/users/update-user/:id', multer.uploadImage, userHandler.updateUser);
app.patch('/api/v1/users/update-user/change-role/:id', userHandler.updateUserRole);
app.patch('/api/v1/users/update-user/change-password/:id', userHandler.updateUserPassword);
app.delete('/api/v1/users/delete-user/:id', userHandler.deleteUser);


app.listen(process.env.USERS_PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server starting on port ${process.env.USERS_PORT}`);
});