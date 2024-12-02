const Event = require('../../packages/event/eventSchema');
const mongoose = require('mongoose');

const getAllEvents = async (req, res) => {
    try {
        const event = await Event.find().populate("relatedEvents");
        res.status(200).json(event);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getSingleEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("relatedEvents");
        res.status(200).json(event);
    } catch (error) {
        res.status(400).send(error);
    }
}

const createEvent = async (req, res) => {
    try {
        let uploadedImage = '';

        if (req.file) {
            uploadedImage = req.file.filename;
        };

        const relatedEvents = req.body.relatedEvents ? JSON.parse(req.body.relatedEvents) : [];

        if (relatedEvents && Array.isArray(relatedEvents)) {
            console.log('Related Events:', relatedEvents);
            const isValidObjectId = relatedEvents.every(id => mongoose.Types.ObjectId.isValid(id));
            if (!isValidObjectId) {
                return res.status(400).send('Invalid related event IDs');
            }
        }

        const event = await Event.create({
            ...req.body,
            relatedEvents,
            image: uploadedImage
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateEvent = async (req, res) => {
    try {
        if (req.file) {
            uploadedImage = req.file.filename;
        };
        const event = await Event.findByIdAndUpdate(req.params.id, { ...req.body, image: uploadedImage }, { new: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    getAllEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent
}