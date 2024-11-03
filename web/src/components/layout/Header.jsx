import { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

import classes from './Header.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <div className={classes.header}>
            <div className='wrapper'>
                <div className={classes.headerContainer}>
                    <div className={classes.headerLeft}>
                        <ul>
                            <NavLink to='/' className={classes.logo}><img src='/assets/Logo.svg' alt="TicketBlaster" width={151} height={24} /></NavLink>
                            <NavLink to="/concerts" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                                Musical Concerts
                            </NavLink>
                            <NavLink to="/comedy" className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.active : '')}>
                                Stand-up Comedy
                            </NavLink>
                        </ul>
                    </div>
                    <div className={classes.headerRight}>
                        <ul>
                            <input type="search" name="keyword" id="keyword" placeholder="Search" className={classes.searchBar}></input>
                            {isLoggedIn ? (
                                <div className={classes.headerIconButtons}>
                                    <Link to='/'><FontAwesomeIcon icon={faCartShopping} className={classes.icons} /></Link>
                                    <Link to='/user'><FontAwesomeIcon icon={faUser} className={classes.icons} /></Link>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className={classes.loginButton}>Log In</Link>
                                    <Link to="/create-account" className={classes.createAccountButton}>Create Account</Link>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}