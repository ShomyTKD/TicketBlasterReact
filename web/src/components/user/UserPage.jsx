import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

import axios from 'axios';

import classes from './UserPage.module.css';

export default function UserPage() {
    const { logout, userRole } = useContext(UserContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:9001/api/v1/auth/logout');
            localStorage.removeItem('jwt');
            logout()
            navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        const path = location.pathname.split('/')[2];
        if (path === 'events') {
            setTitle('Events');
        } else if (path === 'create-event') {
            setTitle('Create Event');
        } else if (path === 'users') {
            setTitle('Users')
        } else if (path === 'tickets-history') {
            setTitle('Tickets History')
        } else if (path === 'user-details') {
            setTitle('User Details')
        };
    }, [location]);

    return (
        <div className="wrapper">
            <div className={classes.navigation}>
                <div className={classes.title}>
                    <h1>{title}</h1>
                    {(userRole === 'admin' && title === 'Events') && (
                        <Link to={'/user/create-event'} className={classes.createEventButton}>Create Event</Link>
                    )}
                </div>
                <ul className={classes.links}>
                    {userRole === 'admin' && (
                        <li><NavLink to="/user/events" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                            Events
                        </NavLink></li>
                    )}
                    {userRole === 'admin' && (
                        <li><NavLink to="/user/users" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                            Users
                        </NavLink></li>
                    )}
                    <li><NavLink to="/user/tickets-history" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                        Tickets History
                    </NavLink></li>
                    <li><NavLink to="/user/user-details" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                        User Details
                    </NavLink></li>
                    <li><Link onClick={handleLogout} className={classes.navLink}>
                        Log Out
                    </Link></li>
                </ul>
            </div>

            <Outlet />
        </div>
    )
}
