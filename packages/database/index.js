const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const DB = process.env.MONGODB_URI

const init = async () => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
}

module.exports = { init };