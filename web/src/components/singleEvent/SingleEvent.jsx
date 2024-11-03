import classes from './SingleEvent.module.css'
import EventCard from '../events/EventCard'

export default function SingleEvent() {
    const concertCard = [
        {
            id: 1, name: 'Incubus', date: 'June 9th 2023', location: 'Vienna, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2, name: 'Test', date: 'June 22th 2023', location: 'Salzburg, Austria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]

    return (
        <div className='wrapper'>
            <div id={classes.event}>
                <div className={classes.eventTitle}>
                    <h1 className={classes.eventHeading}>Incubus</h1>
                    <p className={classes.eventTimeLocation}>June 9th 2023</p>
                    <p className={classes.eventTimeLocation}>Vienna, Austria</p>
                </div>
                <div className={classes.eventContainer}>
                    <div>
                        <img src='/assets/event-example.jpeg' alt="event-name" width={576} height={340} className={classes.eventImage} />
                    </div>
                    <div>
                        <p className={classes.about}>About</p>
                        <p className={classes.eventDetails}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore reiciendis fugiat eveniet veniam atque dolorem quaerat amet, expedita porro minus vero. Aut, dolorum! Autem quam voluptate odio temporibus odit rem consectetur impedit illo voluptatibus, natus eveniet illum doloremque aliquam hic deleniti ad dolorem? Qui, ipsum eos.
                            <br></br><br></br>Dolorem, repellendus dolor quia vel tempore temporibus qui esse? Odit ea facilis dolor corporis amet soluta laboriosam nulla repellat officiis vitae, distinctio enim, deleniti corrupti itaque labore molestias suscipit vel, possimus tempore asperiores. Ipsa sapiente eum sequi dicta totam voluptatibus at libero magni facere. Qui dicta commodi praesentium temporibus id cumque! Quas, aut? Deleniti?</p>
                        <div className={classes.ticketInfo}>
                            <p>Tickets</p>
                            <p className={classes.price}>$60.00 USD</p>
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
                <div className={classes.relatedContainer}>
                    <h2>Related Acts</h2>
                    <div className={classes.relatedActs}>
                        {concertCard.map((concert) => (
                            <EventCard key={concert.id} name={concert.name} date={concert.date} location={concert.location} description={concert.description} buttonLabel={'Buy Tickets'} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}