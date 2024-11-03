import EventCard from "../events/EventCard";
import { Link } from 'react-router-dom';

import classes from './Concerts.module.css'

export default function Concerts() {
    /* fetch with nextjs 
    let data = await fetch('https://api.vercel.app/blog')
    let posts = await data.json()*/

    const concertCard = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: (
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            )
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: (
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            )
        },
    ]

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.concertsHeading}>Musical Concerts</h1>
                <div className={classes.concerts}>
                    {concertCard.map((concert) => (
                        <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Buy Tickets'} />
                    ))}
                </div>
            </div>
            <div className={classes.categories}>
                <Link to="/concerts" className={classes.categoriesButton}>Load More Musical Concerts</Link>
            </div>
        </>
    )
}
