import { useState, useEffect } from 'react';

import EventCard from "../events/EventCard";
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './Comedy.module.css'

export default function Comedy() {
    const [comedies, setComedies] = useState([]);
    const [shownComedies, setShownComedies] = useState(10);

    const getComedies = async () => {
        try {
            const res = await axios.get('/api/v1/events/get-all-events');
            setComedies(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const showMore = () => {
        setShownComedies(shownComedies + 10);
    };

    useEffect(() => {
        getComedies();
    }, []);

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.comedyHeading}>Stand-up Comedy</h1>
                <div className={classes.comedy}>
                    {comedies && comedies.filter(comedy => comedy.category === 'Stand-Up Comedy')
                        .slice(0, shownComedies).map((comedy, i) => {
                            return (
                                <EventCard key={i} name={comedy.name} date={comedy.date} location={comedy.location} image={comedy.image} description={comedy.description} buttonLabel={'Buy Tickets'} href={`/event/${comedy._id}`} />
                            )
                        })}
                </div>
            </div>
            <div className={classes.categories}>
                <Link onClick={showMore} className={classes.categoriesButton}>Load More Stand-up Comedy Shows</Link>
            </div>
        </>
    )
}
