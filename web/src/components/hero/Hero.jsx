import { Link } from 'react-router-dom';

import classes from './Hero.module.css'

export default function Hero() {
    return (
        <div className="wrapper">
            <div className={classes.hero}>
                <div className={classes.heroContent}>
                    <div className={classes.heroInfo}>
                        <p className={classes.heroTitle}>Rage Against The Machine</p>
                        <p className={classes.heroTime}>June 9th 2023, Vienna, Austria</p>
                    </div>
                    <div className={classes.heroButton}>
                        <Link to="/buy-tickets" className={classes.heroLink}>Get tickets</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
