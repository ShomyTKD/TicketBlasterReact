import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

import axios from 'axios';

import classes from './UserDetails.module.css'

export default function UserDetails() {
    const [passwordForm, setPasswordForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserPasswordConfirm, setNewUserPasswordConfirm] = useState('');
    const [newImage, setNewImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const { userID, userName, userEmail, userDefaultImage, updateDefaultImage } = useContext(UserContext);

    const togglePasswordForm = () => {
        setPasswordForm(!passwordForm);
    };

    const updateName = (e) => {
        setNewUserName(e.target.value);
    };

    const updateEmail = (e) => {
        setNewUserEmail(e.target.value);
    };

    const handleUserDetailsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID) {
                throw new Error('User ID is null or undefined');
            }
            const formData = new FormData();
            if (newUserName) {
                formData.append('username', newUserName);
            }
            if (newUserEmail) {
                formData.append('email', newUserEmail);
            }

            if (newImage) {
                formData.append('image', newImage);
            }

            if (formData.has('username') || formData.has('email') || formData.has('image')) {
                const res = await axios.patch(`http://localhost:9002/api/v1/users/update-user/${userID}`, formData);
                if (res.status === 200) {
                    console.log('User details updated successfully');
                    if (formData.has('image')) {
                        console.log(res)
                        updateDefaultImage(res.data.image, false);
                    }
                } else {
                    throw new Error(`Failed to update user with status ${res.status}`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newUserPassword === newUserPasswordConfirm) {
                const res = await axios.patch(`http://localhost:9002/api/v1/users/update-user/change-password/${userID}`, {
                    password: newUserPassword,
                });
                console.log(res)
                if (res.status === 200) {
                    console.log("Password updated successfully");
                    setNewUserPassword('');
                    setNewUserPasswordConfirm('');
                } else {
                    throw new Error(`Failed to update password with status ${res.status}`);
                }
            };

        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setNewImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        setNewUserName(userName);
        setNewUserEmail(userEmail);
    }, [userEmail, userName]);

    return (
        <div className={classes.userDetails}>
            <form className={classes.userForm}>
                <div className={classes.userFormFlex}>
                    <div className={classes.userFormTop}>
                        {previewImage ? (
                            <img src={previewImage} className={classes.avatar} />
                        ) : (
                            userDefaultImage === 'user-default.png' ? (
                                <img src={'/assets/user-default.png'} className={classes.avatar} />
                            ) : (
                                <img src={`/uploads/${userDefaultImage}`} className={classes.avatar} />
                            )
                        )}
                        <div className={classes.usernameField}>
                            <label htmlFor="username" className={classes.formLabelInput + ' ' + classes.formLabel}>Full Name</label>
                            <input type="text" name="username" id="username" value={newUserName} onChange={updateName} className={classes.formInput} />
                        </div>
                    </div>
                    <div className={classes.userFormBottom}>
                        <div className={classes.uploadContainer}>
                            <input
                                type="file"
                                name="image"
                                id="file"
                                onChange={handleImageChange}
                            />
                            <label className={classes.avatarButton} htmlFor="file">Upload Avatar</label>
                        </div>
                        <div className={classes.emailField}>
                            <label htmlFor="email" className={classes.formLabelInput + ' ' + classes.formLabel}>Email</label>
                            <input type="email" name="email" id="email" value={newUserEmail} onChange={updateEmail} className={classes.formInput} />
                        </div>
                    </div>
                </div>
                <button onClick={handleUserDetailsSubmit} className={classes.submitButton}>Submit</button>
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
                            <input type="password" name="password" id="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} className={classes.formInputPassword} />
                        </div>
                        <div className={classes.passwordFormRight}>
                            <label htmlFor="confirmPassword" className={classes.formLabelInput + ' ' + classes.formLabel}>Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" value={newUserPasswordConfirm} onChange={(e) => setNewUserPasswordConfirm(e.target.value)} className={classes.formInputPassword} />
                        </div>
                    </div>
                    <button onClick={handlePasswordSubmit} className={classes.submitButton}>Submit</button>
                </form>)}
            </div>
        </div>
    )
}