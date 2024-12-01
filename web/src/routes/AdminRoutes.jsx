import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function AdminRoutes({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.role !== 'admin') {
                navigate('/')
            }
        }
    }, [navigate]);

    return children;
}