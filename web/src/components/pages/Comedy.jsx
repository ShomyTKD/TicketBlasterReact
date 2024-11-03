import EventCard from "../events/EventCard";
import { Link } from 'react-router-dom';

import classes from './Comedy.module.css'

export default function Comedy() {
    const comedyCard = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.comedyHeading}>Stand-up Comedy</h1>
                <div className={classes.comedy}>
                    {comedyCard.map((concert) => (
                        <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Buy Tickets'} />
                    ))}
                </div>
            </div>
            <div className={classes.categories}>
                <Link to="/comedy" className={classes.categoriesButton}>Load More Stand-up Comedy Shows</Link>
            </div>
        </>
    )
}
