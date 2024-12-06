import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './Hero.module.css'
import Button from '../ui/Button';

export default function Hero() {
    const [heroEvent, setHeroEvent] = useState({});

    const getHeroEvent = async () => {
        try {
            const res = await axios.get('/api/v1/events/get-all-events');
            setHeroEvent(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHeroEvent();
    }, []);


    return (
        <div className="wrapper">
            <div className={classes.hero}>
                {heroEvent && (
                    <div className={classes.heroContent}>
                        <img src={`/uploads/${heroEvent.image}`} alt="hero-image" className={classes.heroImage} />
                        <div className={classes.heroInfo}>
                            <p className={classes.heroTitle}>{heroEvent.name}</p>
                            <p className={classes.heroTime}>{new Date(heroEvent.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}, {heroEvent.location}</p>
                        </div>

                        <div className={classes.heroButton}>
                            <Button href={`/event/${heroEvent._id}`} variant='bold' size='lg'>Get tickets</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
