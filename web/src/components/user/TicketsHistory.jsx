import classes from './TicketsHistory.module.css'

import EventCard from "../events/EventCard";

export default function TicketsHistory() {
    const historyCard = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 3, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]

    return (
        <div className="wrapper">
            <div className={classes.history}>
                {historyCard.map((concert) => (
                    <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Print'} />
                ))}
            </div>

        </div>
    )
}