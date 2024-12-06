import classes from './ResetPassword.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function ResetPassword() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('jwt');
        if (isLoggedIn) {
            navigate('/');
        }
    })

    return (
        <div className="wrapper">
            <h1 className={classes.resetPasswordHeading}>Reset Password</h1>
            <div className={classes.resetPasswordFormContainer}>
                <form action="post" className={classes.resetPasswordForm}>
                    <label htmlFor="password" className={classes.formLabelInput + ' ' + classes.formLabel}>Password</label>
                    <input type="password" name="password" id="password" className={classes.formInput} />
                    <label htmlFor="confirmPassword" className={classes.formLabelInput + ' ' + classes.formLabel}>Re-type password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" className={classes.formInput} />
                    <div className={classes.buttons}>
                        <Button type="submit" variant='primary'>Reset Password</Button>
                        <Button href="/login" variant='outline-pink'>Back to login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}