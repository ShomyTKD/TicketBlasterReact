import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import axios from 'axios';

import classes from './Events.module.css';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [shownConcerts, setShownConcerts] = useState(5);
    const [shownComedies, setShownComedies] = useState(5);

    const getEvents = async () => {
        try {
            const res = await axios.get('http://localhost:9003/api/v1/events/get-all-events');
            setEvents(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const showMoreConcerts = () => {
        setShownConcerts(shownConcerts + 5);
    };

    const showMoreComedies = () => {
        setShownComedies(shownComedies + 5);
    };

    useEffect(() => {
        getEvents();
    }, []);


    return (
        <>
            <div className="wrapper">
                <div className={classes.eventsMain}>
                    <div className={classes.events}>
                        <h1 className={classes.eventsHeading}>Musical Concerts</h1>
                        {events && events.filter(concert => concert.category === 'Musical Concert')
                            .slice(0, shownConcerts).map((concert, i) => {
                                return (
                                    <EventCard key={i} name={concert.name} date={concert.date} location={concert.location} image={concert.image} description={concert.description} buttonLabel={'Buy Tickets'} href={`/event/${concert._id}`} />
                                )
                            })}
                    </div>

                    <div className={classes.events}>
                        <h1 className={classes.eventsHeading}>Stand-up Comedy</h1>
                        {events && events.filter(comedy => comedy.category === 'Stand-Up Comedy')
                            .slice(0, shownComedies).map((comedy, i) => {
                                return (
                                    <EventCard key={i} name={comedy.name} date={comedy.date} location={comedy.location} image={comedy.image} description={comedy.description} buttonLabel={'Buy Tickets'} href={`/event/${comedy._id}`} />
                                )
                            })}
                    </div>
                </div>

            </div>
            <div className={classes.categories}>
                <Link onClick={showMoreConcerts} className={classes.categoriesButton}>See All Musical Concerts</Link>
                <Link onClick={showMoreComedies} className={classes.categoriesButton}>See All Stand-up Comedy Shows</Link>
            </div>
        </>

    )
}
