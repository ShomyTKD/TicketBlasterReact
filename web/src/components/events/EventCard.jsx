import classes from './EventCard.module.css'

import Button from '../ui/Button'

export default function EventCard({ name, date, location, image, href, description, buttonLabel }) {
    return (
        <div className={classes.eventContainer}>
            <div>
                <img src={`/uploads/${image}`} alt="event-name" width={260} height={155} className={classes.eventImg} />
            </div>
            <div className={classes.eventRight}>
                <div>
                    <p className={classes.eventName}>{name}</p>
                    <p className={classes.eventDate}>{new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}</p>
                    <p className={classes.eventDetails}>{description}</p>
                </div>
                <div className={classes.eventLocationAction}>
                    <p className={classes.eventLocation}>{location}</p>
                    <Button href={href} variant='secondary'>{buttonLabel}</Button>
                </div>
            </div>
        </div>
    )
}