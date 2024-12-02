import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './EventsManager.module.css'

export default function EventsManager() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [togglePopup, setTogglePopup] = useState(false);

    const getEvents = async () => {
        try {
            const response = await axios.get('/api/v1/events/get-all-events');
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePopup = () => {
        setTogglePopup(!togglePopup);
    }

    useEffect(() => {
        getEvents();
    }, []);

    const handleDeleteEvent = async () => {
        try {
            const res = await axios.delete(`/api/v1/events/delete-event/${selectedEvent}`);
            if (res.status === 200) {
                setEvents(currentEvents => currentEvents.filter(event => event._id !== selectedEvent));
                setTogglePopup(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.container}>
            {events && events.map((event, i) => (
                <div className={classes.event} key={i}>
                    <Link to={`/admin/edit-event/${event._id}`} className={classes.info}>
                        <img src={`/uploads/${event.image}`} alt="event-name" width={149} height={88} className={classes.image} />
                        <div className={classes.content}>
                            <h3 className={classes.name}>{event.name}</h3>
                            <div className={classes.dateAndLocation}>
                                <p className={classes.date}>{new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</p>
                                <p className={classes.location}>{event.location}</p>
                            </div>
                        </div>
                    </Link>
                    <Link onClick={() => {
                        deletePopup();
                        setSelectedEvent(event._id);
                    }} className={classes.deleteButton}>Delete Event</Link>
                </div>
            ))}

            {togglePopup && (
                <div className={classes.popupContainer}>
                    <div>
                        <h2>Are you sure?</h2>
                        <p>You are about to delete an event from the system. Please proceed with caution.</p>
                    </div>
                    <div className={classes.popupButtons}>
                        <Link className={classes.cancelButton} onClick={() => setTogglePopup(false)}>Cancel</Link>
                        <Link className={classes.deleteButton} onClick={() => handleDeleteEvent(selectedEvent)}>Delete</Link>
                    </div>
                </div>
            )}
        </div>
    )
}