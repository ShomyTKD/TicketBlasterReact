import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import classes from './Signup.module.css';

export default function Signup() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwt');
        if (isLoggedIn) {
            navigate('/');
        }
    })

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userExists, setUserExists] = useState(false);

    const validator = (email) => {
        const emailLower = email.toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailLower);
    };

    const validateName = username.trim().split(' ').length >= 2;
    const validateEmail = validator(email);
    const validatePassword = password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validateName) {
                console.log('Please enter a valid name');
                return;
            }
            if (!validateEmail) {
                console.log('Please enter a valid email');
                return;
            }
            if (!validatePassword) {
                console.log('Password must be at least 8 characters long');
                return;
            }
            if (password !== confirmPassword) {
                console.log('Passwords do not match');
                return;
            }

            const res = await axios.post('http://localhost:9001/api/v1/auth/signup', {
                username,
                email,
                password,
                confirmPassword
            });

            if (res.status === 201) {
                setUserName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('')
            };

            navigate('/login');
        } catch (error) {
            if (error.response.data.message === 'User already exists') {
                setUserExists(true);
            } else {
                console.log(error.response.data.message);
            }
        }
    }

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.signupHeading}>Create account</h1>
                <div className={classes.signupFormContainer}>
                    <form onSubmit={handleSubmit} className={classes.signupForm}>
                        <label
                            htmlFor="username"
                            className={
                                classes.formLabelInput + ' ' + classes.formLabel
                            }
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={classes.formInput}
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        {username !== '' && !validateName && (
                            <p className={classes.invalidFormat}>Firstname and Lastname are required</p>
                        )}
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
                        {userExists && (
                            <p className={classes.invalidFormat}>Account with this email already exists</p>
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
                        {password !== '' && !validatePassword && (
                            <p className={classes.invalidFormat}>Password must contain at least 8 characters</p>
                        )}
                        <label
                            htmlFor="confirmPassword"
                            className={
                                classes.formLabelInput + ' ' + classes.formLabel
                            }
                        >
                            Re-type Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className={classes.formInput}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {(confirmPassword !== '' && password !== confirmPassword) && (
                            <p className={classes.invalidFormat}>
                                Passwords do not match
                            </p>
                        )}

                        <button type="submit" className={classes.signupButton}>
                            Create account
                        </button>
                        <Link
                            to="/login"
                            className={classes.alreadyHaveButton}
                        >
                            Already have an account?
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
