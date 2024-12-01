import classes from './ForgotPassword.module.css';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function ForgotPassword() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwt');
        if (isLoggedIn) {
            navigate('/');
        }
    })

    const [email, setEmail] = useState('');

    const validator = (email) => {
        const emailLower = email.toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailLower);
    };

    const validateEmail = validator(email);

    return (
        <>
            <div className="wrapper">
                <h1 className={classes.forgotPasswordHeading}>
                    Forgot Password
                </h1>
                <div className={classes.forgotPasswordFormContainer}>
                    <form action="post" className={classes.forgotPasswordForm}>
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
                        <button
                            type="submit"
                            className={classes.forgotPasswordButton}
                        >
                            Send password reset email
                        </button>
                        <Link to="/login" className={classes.backToLogin}>
                            Back to login
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
