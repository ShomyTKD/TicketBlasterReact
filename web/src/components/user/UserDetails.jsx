import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import classes from './UserDetails.module.css';
import Button from '../ui/Button';

export default function UserDetails() {
    const [passwordForm, setPasswordForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserPasswordConfirm, setNewUserPasswordConfirm] = useState('');
    const [newImage, setNewImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);

    const {
        userID,
        userName,
        userEmail,
        userDefaultImage,
        updateDefaultImage,
    } = useContext(UserContext);

    const validator = (email) => {
        const emailLower = email.toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailLower);
    };

    const validateName = newUserName.trim().split(' ').length >= 2;
    const validateEmail = validator(newUserEmail);
    const validatePassword = newUserPassword.length >= 8;

    const togglePasswordForm = () => {
        setPasswordForm(!passwordForm);
    };

    const updateName = (e) => {
        setNewUserName(e.target.value);
    };

    const updateEmail = (e) => {
        setNewUserEmail(e.target.value);
    };

    const handlePasswordToggle = () => {
        if (type === 'password') {
            setIcon(faEye);
            setType('text');
        } else {
            setIcon(faEyeSlash);
            setType('password');
        }
    };

    const handleUserDetailsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID) {
                throw new Error('User ID is null or undefined');
            }
            if (!validateName) {
                console.log('Please enter a valid name');
                return;
            }
            if (!validateEmail) {
                console.log('Please enter a valid email');
                return;
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

            if (
                formData.has('username') ||
                formData.has('email') ||
                formData.has('image')
            ) {
                const res = await axios.patch(
                    `/api/v1/users/update-user/${userID}`,
                    formData
                );
                if (res.status === 200) {
                    console.log('User details updated successfully');
                    if (formData.has('image')) {
                        console.log(res);
                        updateDefaultImage(res.data.image, false);
                    }
                } else {
                    throw new Error(
                        `Failed to update user with status ${res.status}`
                    );
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validatePassword) {
                console.log('Password must be at least 8 characters long');
                return;
            }
            if (newUserPassword !== newUserPasswordConfirm) {
                console.log('Passwords do not match');
                return;
            }

            if (newUserPassword === newUserPasswordConfirm) {
                const res = await axios.patch(
                    `/api/v1/users/update-user/change-password/${userID}`,
                    {
                        password: newUserPassword,
                    }
                );
                console.log(res);
                if (res.status === 200) {
                    console.log('Password updated successfully');
                    setNewUserPassword('');
                    setNewUserPasswordConfirm('');
                } else {
                    throw new Error(
                        `Failed to update password with status ${res.status}`
                    );
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
                            <img
                                src={previewImage}
                                className={classes.avatar}
                            />
                        ) : userDefaultImage === 'user-default.png' ? (
                            <img
                                src={'/assets/user-default.png'}
                                className={classes.avatar}
                            />
                        ) : (
                            <img
                                src={`/uploads/${userDefaultImage}`}
                                className={classes.avatar}
                            />
                        )}
                        <div className={classes.usernameField}>
                            <label
                                htmlFor="username"
                                className={
                                    classes.formLabelInput +
                                    ' ' +
                                    classes.formLabel
                                }
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={newUserName}
                                onChange={updateName}
                                className={classes.formInput}
                            />
                            {newUserName !== '' && !validateName && (
                                <p className={classes.invalidFormat}>Firstname and Lastname are required</p>
                            )}
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
                            <label
                                className={classes.avatarButton}
                                htmlFor="file"
                            >
                                Upload Avatar
                            </label>
                        </div>
                        <div className={classes.emailField}>
                            <label
                                htmlFor="email"
                                className={
                                    classes.formLabelInput +
                                    ' ' +
                                    classes.formLabel
                                }
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={newUserEmail}
                                onChange={updateEmail}
                                className={classes.formInput}
                            />
                            {newUserEmail !== '' && !validateEmail && (
                                <p className={classes.invalidFormat}>Please enter a valid email</p>
                            )}
                        </div>
                    </div>
                </div>
                <Button
                    onClick={handleUserDetailsSubmit}
                    variant='secondary'
                >
                    Submit
                </Button>
            </form>

            <div className={classes.passwordChange}>
                <div className={classes.passwordChangeFlex}>
                    <h3>Password</h3>
                    <Button
                        variant='primary'
                        onClick={togglePasswordForm}
                    >
                        Change Password
                    </Button>
                </div>
                {passwordForm && (
                    <form className={classes.passwordForm}>
                        <div className={classes.passwordFormFlex}>
                            <div className={classes.passwordFormLeft}>
                                <label
                                    htmlFor="password"
                                    className={
                                        classes.formLabelInput +
                                        ' ' +
                                        classes.formLabel
                                    }
                                >
                                    Password
                                </label>

                                <input
                                    type={type}
                                    name="password"
                                    id="password"
                                    value={newUserPassword}
                                    onChange={(e) =>
                                        setNewUserPassword(e.target.value)
                                    }
                                    className={classes.formInputPassword}
                                />
                                {newUserPassword !== '' && !validatePassword && (
                                    <p className={classes.invalidFormat}>At least 8 characters</p>
                                )}
                            </div>
                            <div className={classes.passwordFormRight}>
                                <label
                                    htmlFor="confirmPassword"
                                    className={
                                        classes.formLabelInput +
                                        ' ' +
                                        classes.formLabel
                                    }
                                >
                                    Confirm Password
                                </label>
                                <div className={classes.passwordField}>
                                    <input
                                        type={type}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={newUserPasswordConfirm}
                                        onChange={(e) =>
                                            setNewUserPasswordConfirm(
                                                e.target.value
                                            )
                                        }
                                        className={classes.formInputPassword}
                                    />
                                    <span onClick={handlePasswordToggle} className={classes.passwordIconContainer}>
                                        <FontAwesomeIcon
                                            icon={icon}
                                        />
                                    </span>
                                </div>
                                {newUserPasswordConfirm !== '' && newUserPassword !== newUserPasswordConfirm && (
                                    <p className={classes.invalidFormat}>Passwords do not match</p>
                                )}
                            </div>

                        </div>
                        <Button
                            onClick={handlePasswordSubmit}
                            variant='secondary'
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
