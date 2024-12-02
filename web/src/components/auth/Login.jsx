import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { UserContext } from '../../Context/UserContext';
import { useState, useEffect, useContext } from 'react';

import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwt');
        if (isLoggedIn) {
            navigate('/');
        }
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const validator = (email) => {
        const emailLower = email.toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailLower);
    };

    const validateEmail = validator(email);

    const { loginSuccess } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post('/api/v1/auth/login', {
                email,
                password
            })
            const token = res.data.token;
            localStorage.setItem('jwt', token);
            if (res.status === 200) {
                console.log("login successful")
                loginSuccess();
                navigate('/');
            }
        } catch (error) {
            setInvalidCredentials(true)
            console.log(error)
        }
    }

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.loginHeading}>Log In</h1>
                <div className={classes.loginFormContainer}>
                    <form action="post" onSubmit={handleSubmit} className={classes.loginForm}>
                        <label
                            htmlFor="email"
                            className={
                                classes.formLabelInput + ' ' + classes.formLabel
                            }
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={classes.formInput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {email !== '' && !validateEmail && (
                            <p className={classes.invalidFormat}>Please provide a valid email</p>
                        )}
                        <label
                            htmlFor="password"
                            className={
                                classes.formLabelInput + ' ' + classes.formLabel
                            }
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={classes.formInput}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {invalidCredentials && (
                            <p className={classes.invalidFormat}>Invalid Credentials</p>
                        )}
                        <div className={classes.loginOptions}>
                            <Link
                                to="/forgot-password"
                                className={classes.forgotPasswordButton}
                            >
                                Forgot Password?
                            </Link>
                            <button
                                type="submit"
                                className={classes.loginButton}
                            >
                                Log In
                            </button>
                        </div>

                        <Link
                            to="/create-account"
                            className={classes.noAccountButton}
                        >
                            Don&apos;t have an account?
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
