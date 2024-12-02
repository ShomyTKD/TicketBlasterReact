import classes from './TicketsHistory.module.css'

import EventCard from "../events/EventCard";

export default function TicketsHistory() {
    const historyCard = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'image-38f4ee51-cbda-476d-814c-2b7464438b7a-1733139147749.jpeg'
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'image-38f4ee51-cbda-476d-814c-2b7464438b7a-1733139147749.jpeg'
        },
        {
            id: 3, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'image-38f4ee51-cbda-476d-814c-2b7464438b7a-1733139147749.jpeg'
        },
    ]

    return (
        <div className={classes.history}>
            {historyCard.map((event) => (
                <EventCard key={event.id} name={event.name} date={event.date} location={event.location} image={event.image} description={event.description} buttonLabel={'Print'} />
            ))}
        </div>
    )
}