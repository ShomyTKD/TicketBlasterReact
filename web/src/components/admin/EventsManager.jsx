import classes from './EventsManager.module.css'

export default function EventsManager() {
    const dummyEvents = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]

    const handleDeleteEvent = () => {
        console.log('delete event')
    }

    return (

        <div className={classes.container}>
            {dummyEvents.map((event) => (
                <div className={classes.event} key={event.id}>
                    <div className={classes.info}>
                        <img src='/assets/event-example.jpeg' alt="event-name" width={149} height={88} className={classes.image} />
                        <div className={classes.content}>
                            <h3 className={classes.name}>{event.name}</h3>
                            <div className={classes.dateAndLocation}>
                                <p className={classes.date}>{event.date}</p>
                                <p>{event.location}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleDeleteEvent} className={classes.deleteButton}>Delete Event</button>
                </div>
            ))}
        </div>
    )
}