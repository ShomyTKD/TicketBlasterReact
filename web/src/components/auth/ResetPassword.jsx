import classes from './ResetPassword.module.css'
import { Link } from 'react-router-dom';

export default function ResetPassword() {
    return (
        <>
            <div className="wrapper">
                <h1 className={classes.resetPasswordHeading}>Reset Password</h1>
                <div className={classes.resetPasswordFormContainer}>
                    <form action="post" className={classes.resetPasswordForm}>
                        <label htmlFor="password" className={classes.formLabelInput + ' ' + classes.formLabel}>Password</label>
                        <input type="password" name="password" id="password" className={classes.formInput} />
                        <label htmlFor="confirmPassword" className={classes.formLabelInput + ' ' + classes.formLabel}>Re-type password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className={classes.formInput} />
                        <button type="submit" className={classes.resetPasswordButton}>Reset Password</button>
                        <Link to="/login" className={classes.backToLogin}>Back to login</Link>
                    </form>
                </div>
            </div>
        </>
    )
}