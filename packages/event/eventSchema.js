const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String,
        enum: ['Musical Concert', 'Stand-Up Comedy']
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    },
    relatedEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ],

});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;