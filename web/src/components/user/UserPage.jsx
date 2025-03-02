import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

import axios from 'axios';

import classes from './UserPage.module.css';
import Button from '../ui/Button';

export default function UserPage() {
    const { logout, userRole } = useContext(UserContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');

    const handleLogout = async () => {
        try {
            await axios.get('/api/v1/auth/logout');
            localStorage.removeItem('jwt');
            logout();
            navigate('/');
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwt');
        if (!isLoggedIn) {
            navigate('/login');
        }

        const path = location.pathname.split('/')[2];
        if (path === 'events') {
            setTitle('Events');
        } else if (path === 'create-event') {
            setTitle('Create Event');
        } else if (path === 'edit-event') {
            setTitle('Edit Event');
        } else if (path === 'users') {
            setTitle('Users')
        } else if (path === 'tickets-history') {
            setTitle('Tickets History')
        } else if (path === 'user-details') {
            setTitle('User Details')
        };
    }, [location, navigate]);

    return (
        <div className="wrapper">
            <div className={classes.navigation}>
                <div className={classes.title}>
                    <h1>{title}</h1>
                    {(userRole === 'admin' && title === 'Events') && (
                        <Button href={'/admin/create-event'} variant="primary">Create Event</Button>
                    )}
                </div>
                <ul className={classes.links}>
                    {userRole === 'admin' && (
                        <li><NavLink to="/admin/events" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                            Events
                        </NavLink></li>
                    )}
                    {userRole === 'admin' && (
                        <li><NavLink to="/admin/users" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
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
