import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import classes from './UserProfile.module.css';

import TicketsHistory from './TicketsHistory';
import UserDetails from './UserDetails';

export default function UserProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    const [title, setTitle] = useState('');

    const getTitle = () => {
        const path = location.pathname.split('/')[2];
        if (path === 'events' || path === 'create-event') {
            setTitle('Events');
        } else if (path === 'users') {
            setTitle('Users')
        } else if (path === 'tickets-history') {
            setTitle('Tickets History')
        } else if (path === 'user-details') {
            setTitle('User Details')
        };
    };

    useEffect(() => {
        navigate('/user/user-details');
    }, []);

    useEffect(() => {
        getTitle()
    }, [location])

    return (
        <div className="wrapper">
            <div className={classes.navigation}>

                <h1 className={classes.heading}>{title}</h1>
                <ul className={classes.links}>
                    <li><NavLink to="/user/events" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                        Events
                    </NavLink></li>
                    <li><NavLink to="/user/users" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                        Users
                    </NavLink></li>
                    <li><NavLink to="/user/tickets-history" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                        Tickets History
                    </NavLink></li>
                    <li><NavLink to="/user/user-details" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                        User Details
                    </NavLink></li>
                    {/* <li><NavLink href="/" onClick={handleLogout} className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                    Log Out
                    </NavLink></li> */}
                </ul>
            </div>

            {pathname == '/user/tickets-history' && (
                <TicketsHistory />
            )}
            {pathname == '/user/user-details' && (
                <UserDetails />
            )}
        </div>
    )
}
