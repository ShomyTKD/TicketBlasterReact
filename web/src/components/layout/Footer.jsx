import { Link, NavLink } from 'react-router-dom';

import classes from './Footer.module.css'

export default function Footer() {
    return (
        <div className={classes.footer}>
            <div className="wrapper">
                <div className={classes.footerContainer}>
                    <div className={classes.footerLeft}>
                        <ul>
                            <Link to="/" className={classes.logo}><img src='/assets/Logo.svg' alt="TicketBlaster" width={151} height={24} /></Link>
                            <NavLink to="/concerts" className={classes.navLink}>Musical Concerts</NavLink>
                            <NavLink to="/comedy" className={classes.navLink}>Stand-up comedy</NavLink>
                        </ul>
                    </div>
                    <div className={classes.footerRight}>
                        Copyright TicketBlaster 2024
                    </div>
                </div>
            </div>
        </div>
    )
}
