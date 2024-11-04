import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('jwt');
            /* console.log(token) */
            if (token) {
                const decodedToken = jwtDecode(token);
                /* console.log(decodedToken.id) */
                const res = await axios.get(`http://localhost:9002/api/v1/users/get-user/${decodedToken.id}`);
                const singleUser = res.data.data.singleUser;
                console.log(singleUser);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loginSuccess = async () => {
        setIsLoggedIn(true);
        await fetchUserData();
    };

    const logOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
            fetchUserData();
        };
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, loginSuccess, logOut }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;