import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUserID(decodedToken.id);
                setUserRole(decodedToken.role);
                const res = await axios.get(`http://localhost:9002/api/v1/users/get-user/${decodedToken.id}`);
                const singleUser = res.data.data.singleUser;
                setUserName(singleUser.username);
                setUserEmail(singleUser.email);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loginSuccess = async () => {
        setIsLoggedIn(true);
        await fetchUserData();
    };

    const logout = () => {
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
        <UserContext.Provider value={{ isLoggedIn, loginSuccess, logout, userID, userName, userEmail, userRole }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;