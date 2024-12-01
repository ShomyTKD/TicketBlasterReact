import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../Context/UserContext';

import classes from './SearchPage.module.css'

export default function SearchPage() {
    const [events, setEvents] = useState([]);

    const { searchQuery, newSearchQuery } = useContext(UserContext);

    const getEvents = async () => {
        try {
            const res = await axios.get('http://localhost:9003/api/v1/events/get-all-events');
            const filteredEvents = res.data.filter(event => {
                return (
                    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            setEvents(filteredEvents);
            localStorage.setItem('searchQuery', searchQuery);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const searchQuery = localStorage.getItem('searchQuery');
        if (searchQuery) {
            newSearchQuery(searchQuery);
            getEvents();
        }
    }, [searchQuery]);

    return (
        <div className="wrapper">
            <h1 className={classes.heading}>Search results for: {searchQuery}</h1>
            <div className={classes.events}>
                {events.length > 0 ? (events.map((event, i) => (
                    <div key={i} className={classes.event}>
                        <div className={classes.eventLeft}>
                            <img src={`/uploads/${event.image}`} alt={event.name} className={classes.image} />
                            <div className={classes.eventInfo}>
                                <h2>{event.name}</h2>
                                <p className={classes.description}>{event.description}</p>
                                <p className={classes.date}>{new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</p>
                                <p className={classes.location}>{event.location}</p>
                            </div>
                        </div>
                        <Link to={`/event/${event._id}`} className={classes.button}>Buy Tickets</Link>
                    </div>
                ))
                ) : (
                    <p>Nothing found here, try searching again.</p>
                )}
            </div>
        </div>
    )
}
