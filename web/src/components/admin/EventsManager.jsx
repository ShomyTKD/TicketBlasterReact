import { useState, useEffect } from 'react';

import axios from 'axios';

import classes from './EventsManager.module.css'

export default function EventsManager() {
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost:9003/api/v1/events/get-all-events');
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleDeleteEvent = () => {
        console.log('delete event')
    }

    return (
        <div className={classes.container}>
            {events && events.map((event, i) => (
                <div className={classes.event} key={i}>
                    <div className={classes.info}>
                        <img src={`/uploads/${event.image}`} alt="event-name" width={149} height={88} className={classes.image} />
                        <div className={classes.content}>
                            <h3 className={classes.name}>{event.name}</h3>
                            <div className={classes.dateAndLocation}>
                                <p className={classes.date}>{new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</p>
                                <p>{event.location}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleDeleteEvent} className={classes.deleteButton}>Delete Event</button>
                </div>
            ))}
        </div>
    )
}