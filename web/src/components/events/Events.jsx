import { Link } from 'react-router-dom';
import EventCard from './EventCard'

import classes from './Events.module.css'

export default function Events() {
    const comedyCard = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]

    const concertCard = [
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
                <div className={classes.eventsMain}>
                    <div className={classes.events}>
                        <h1 className={classes.eventsHeading}>Musical Concerts</h1>
                        {concertCard.map((concert) => (
                            <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Buy Tickets'} />
                        ))}
                    </div>

                    <div className={classes.events}>
                        <h1 className={classes.eventsHeading}>Stand-up Comedy</h1>
                        {comedyCard.map((concert) => (
                            <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Buy Tickets'} />
                        ))}
                    </div>
                </div>

            </div>
            <div className={classes.categories}>
                <Link to="/concerts" className={classes.categoriesButton}>See All Musical Concerts</Link>
                <Link to="/comedies" className={classes.categoriesButton}>See All Stand-up Comedy Shows</Link>
            </div>
        </>

    )
}
