import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import classes from './SingleEvent.module.css'
import EventCard from '../events/EventCard'

export default function SingleEvent() {
    const [event, setEvent] = useState({});

    const { id } = useParams();

    const getEvent = async () => {
        try {
            const res = await axios.get(`http://localhost:9003/api/v1/events/get-event/${id}`);
            console.log(res.data)
            setEvent(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getEvent();
        }
    }, [id]);

    return (
        <div className='wrapper'>
            <div id={classes.event}>
                <div className={classes.eventTitle}>
                    <h1 className={classes.eventHeading}>{event.name}</h1>
                    <p className={classes.eventTimeLocation}>{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}</p>
                    <p className={classes.eventTimeLocation}>{event.location}</p>
                </div>
                <div className={classes.eventContainer}>
                    <div>
                        <img src={`/uploads/${event.image}`} alt="event-name" width={576} height={340} className={classes.eventImage} />
                    </div>
                    <div className={classes.eventRight}>
                        <div>
                            <p className={classes.about}>About</p>
                            <p className={classes.eventDetails}>{event.description}</p>
                        </div>
                        <div>
                            <div className={classes.ticketInfo}>
                                <p>Tickets</p>
                                <p className={classes.price}>${event.price} USD</p>
                            </div>

                            <div className={classes.ticketsForm}>
                                <form method="post" id="form-quantity" className={classes.formQuantity}>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="count"
                                        placeholder="1"
                                    />
                                    <button
                                        type="button"
                                        className={classes.buttonAdd}
                                    >
                                        Add to cart
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.relatedContainer}>
                    <h2>Related Acts</h2>
                    <div className={classes.relatedActs}>
                        {/* {concertCard.map((concert) => (
                            <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Buy Tickets'} />
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}