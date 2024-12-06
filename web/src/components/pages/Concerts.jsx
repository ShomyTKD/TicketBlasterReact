import { useState, useEffect } from 'react';

import EventCard from "../events/EventCard";
import Button from '../ui/Button';
import axios from 'axios';

import classes from './Concerts.module.css'

export default function Concerts() {
    const [concerts, setConcerts] = useState([]);
    const [shownConcerts, setShownConcerts] = useState(10);

    const getConcerts = async () => {
        try {
            const res = await axios.get('/api/v1/events/get-all-events');
            setConcerts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const showMore = () => {
        setShownConcerts(shownConcerts + 10);
    };

    useEffect(() => {
        getConcerts();
    }, []);

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.concertsHeading}>Musical Concerts</h1>
                <div className={classes.concerts}>
                    {concerts && concerts.filter(concert => concert.category === 'Musical Concert')
                        .slice(0, shownConcerts).map((concert, i) => {
                            return (
                                <EventCard key={i} name={concert.name} date={concert.date} location={concert.location} image={concert.image} description={concert.description} buttonLabel={'Buy Tickets'} href={`/event/${concert._id}`} />
                            )
                        })}
                </div>
            </div>
            <div className={classes.categories}>
                <Button onClick={showMore} variant='outline' size='xlg'>Load More Musical Concerts</Button>
            </div>
        </>
    )
}
