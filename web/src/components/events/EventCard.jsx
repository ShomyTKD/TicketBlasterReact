import { Link } from 'react-router-dom';

import classes from './EventCard.module.css'

export default function EventCard({ name, date, location, description, buttonLabel }) {
    return (
        <div className={classes.eventContainer}>
            <div>
                <img src='/assets/event-example.jpeg' alt="event-name" width={260} height={155} className={classes.eventImg} />
            </div>
            <div>
                <p className={classes.eventName}>{name}</p>
                <p className={classes.eventDate}>{date}</p>
                <p className={classes.eventDetails}>{description}</p>
                <div className={classes.eventLocationAction}>
                    <p className={classes.eventLocation}>{location}</p>
                    <Link to="/event" className={classes.eventButton}>{buttonLabel}</Link>
                </div>
            </div>
        </div>
    )
}