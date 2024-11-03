import classes from './UserDetails.module.css'

import { useState } from 'react';

export default function UserDetails() {
    const [passwordForm, setPasswordForm] = useState(false);

    const togglePasswordForm = () => {
        setPasswordForm(!passwordForm);
    };

    return (
        <div className="wrapper">
            <div className={classes.userDetails}>
                <form className={classes.userForm}>
                    <div className={classes.userFormFlex}>
                        <div className={classes.userFormTop}>
                            <img src="/assets/avatar.jpg" className={classes.avatar} />
                            <div className={classes.usernameField}>
                                <label htmlFor="username" className={classes.formLabelInput + ' ' + classes.formLabel}>Full Name</label>
                                <input type="text" name="username" id="username" className={classes.formInput} />
                            </div>
                        </div>
                        <div className={classes.userFormBottom}>
                            <button className={classes.avatarButton}>Upload Avatar</button>
                            <div className={classes.emailField}>
                                <label htmlFor="email" className={classes.formLabelInput + ' ' + classes.formLabel}>Email</label>
                                <input type="email" name="email" id="email" className={classes.formInput} />
                            </div>
                        </div>
                    </div>
                    <button className={classes.submitButton}>Submit</button>
                </form>

                <div className={classes.passwordChange}>
                    <div className={classes.passwordChangeFlex}>
                        <h3>Password</h3>
                        <button className={classes.changePasswordButton} onClick={togglePasswordForm}>Change Password</button>
                    </div>
                    {passwordForm && (<form className={classes.passwordForm}>
                        <div className={classes.passwordFormFlex}>
                            <div className={classes.passwordFormLeft}>
                                <label htmlFor="password" className={classes.formLabelInput + ' ' + classes.formLabel}>Password</label>
                                <input type="password" name="password" id="password" className={classes.formInputPassword} />
                            </div>
                            <div className={classes.passwordFormRight}>
                                <label htmlFor="confirmPassword" className={classes.formLabelInput + ' ' + classes.formLabel}>Confirm Password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" className={classes.formInputPassword} />
                            </div>
                        </div>
                        <button className={classes.submitButton}>Submit</button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}