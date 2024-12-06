import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './UsersManager.module.css'

import Button from '../ui/Button';

export default function UsersManager() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [toggleDeletePopup, setToggleDeletePopup] = useState(false);
    const [toggleUserPopup, setToggleUserPopup] = useState(false);
    const [toggleAdminPopup, setToggleAdminPopup] = useState(false);

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/v1/users/get-all-users');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            if (!selectedUser) {
                console.log("User not found");
                return;
            }
            const res = await axios.delete(`/api/v1/users/delete-user/${selectedUser}`);
            console.log(res);
            if (res.status === 200) {
                setUsers(currentUsers => currentUsers.filter(user => user._id !== selectedUser));
                setToggleDeletePopup(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRoleChange = async () => {
        try {
            if (!selectedUser) {
                console.log("User not found");
                return;
            }
            const currentUser = users.find(user => user._id === selectedUser);
            const currentRole = currentUser.role;
            const newRole = currentRole === 'admin' ? 'user' : 'admin';

            const res = await axios.patch(`/api/v1/users/update-user/change-role/${selectedUser}`);
            console.log(res.status)
            if (res.status === 200) {
                setUsers(currentUsers => {
                    return currentUsers.map(user => {
                        if (user._id === selectedUser) {
                            return { ...user, role: newRole };
                        }
                        return user;
                    })
                })
            }
            if (newRole === 'admin') {
                setToggleAdminPopup(false);
            } else {
                setToggleUserPopup(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePopup = () => {
        setToggleDeletePopup(!toggleDeletePopup);
    }

    const userPopup = () => {
        setToggleUserPopup(!toggleUserPopup);
    }

    const adminPopup = () => {
        setToggleAdminPopup(!toggleAdminPopup);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={classes.container}>
            {users && users.map((user, i) => (
                <div className={classes.user} key={i}>
                    <div className={classes.info}>
                        {/* <img src={`/uploads/${user.image}`} alt="event-name" width={72} height={72} className={classes.image} /> */}
                        <img src={
                            user.image.startsWith('user-') ? `/assets/${user.image}` : `/uploads/${user.image}`
                        } alt="profile-pic" className={classes.pfp} />
                        <div>
                            <h3 className={classes.name}>{user.username}</h3>
                            <p className={classes.email}>{user.email}</p>
                        </div>
                    </div>
                    <div className={classes.buttons}>
                        {user.role === 'user' && (
                            <Button variant='outline-pink' onClick={() => {
                                setSelectedUser(user._id);
                                adminPopup();
                            }}>
                                Make Admin
                            </Button>
                        )}
                        {user.role === 'admin' && (
                            <Button variant='outline-pink' onClick={() => {
                                setSelectedUser(user._id);
                                userPopup();
                            }}>
                                Make User
                            </Button>
                        )}
                        <Button variant='secondary' onClick={() => {
                            setSelectedUser(user._id);
                            deletePopup();
                        }}>
                            Delete User
                        </Button>
                    </div>
                </div>
            ))}

            {toggleDeletePopup && (
                <div className={classes.popupContainer}>
                    <div>
                        <h2>Are you sure?</h2>
                        <p>You are about to delete this user. Please proceed with caution.</p>
                    </div>
                    <div className={classes.popupButtons}>
                        <Button variant='outline' onClick={() => setToggleDeletePopup(false)}>Cancel</Button>
                        <Button variant='secondary' onClick={() => handleDeleteUser(selectedUser)}>Delete user</Button>
                    </div>
                </div>
            )}

            {toggleUserPopup && (
                <div className={classes.popupContainer}>
                    <div>
                        <h2>Are you sure?</h2>
                        <p>You are about to downgrade a user from administrator. Please proceed with caution.</p>
                    </div>
                    <div className={classes.popupButtons}>
                        <Button variant='outline' onClick={() => setToggleUserPopup(false)}>Cancel</Button>
                        <Button variant='secondary' onClick={() => handleRoleChange(selectedUser)}>Downgrade user</Button>
                    </div>
                </div>
            )}

            {toggleAdminPopup && (
                <div className={classes.popupContainer}>
                    <div>
                        <h2>Are you sure?</h2>
                        <p>You are about to make a user administrator of the system. Please proceed with caution.</p>
                    </div>
                    <div className={classes.popupButtons}>
                        <Button variant='outline' onClick={() => setToggleAdminPopup(false)}>Cancel</Button>
                        <Button variant='secondary' onClick={() => handleRoleChange(selectedUser)}>Make user admin</Button>
                    </div>
                </div>
            )}
        </div>
    )
}