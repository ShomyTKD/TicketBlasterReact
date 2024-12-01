import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './UsersManager.module.css'

export default function UsersManager() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [toggleDeletePopup, setToggleDeletePopup] = useState(false);
    const [toggleUserPopup, setToggleUserPopup] = useState(false);
    const [toggleAdminPopup, setToggleAdminPopup] = useState(false);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9002/api/v1/users/get-all-users');
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
            const res = await axios.delete(`http://localhost:9002/api/v1/users/delete-user/${selectedUser}`);
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
            const userData = users.find(user => user._id === selectedUser);
            const currentRole = userData.role;
            const newRole = currentRole === 'admin' ? 'user' : 'admin';

            const res = await axios.patch(`http://localhost:9002/api/v1/users/update-user/change-role/${selectedUser}`);
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
                        <img src={`/assets/avatar.jpg`} alt="profile-pic" className={classes.pfp} />
                        <div>
                            <h3 className={classes.name}>{user.username}</h3>
                            <p className={classes.email}>{user.email}</p>
                        </div>
                    </div>
                    <div className={classes.buttons}>
                        {user.role === 'user' && (
                            <Link className={classes.roleButton} onClick={() => {
                                setSelectedUser(user._id);
                                adminPopup();
                            }}>
                                Make Admin
                            </Link>
                        )}
                        {user.role === 'admin' && (
                            <Link className={classes.roleButton} onClick={() => {
                                setSelectedUser(user._id);
                                userPopup();
                            }}>
                                Make User
                            </Link>
                        )}
                        <Link className={classes.deleteButton} onClick={() => {
                            setSelectedUser(user._id);
                            deletePopup();
                        }}>
                            Delete User
                        </Link>
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
                        <Link className={classes.cancelButton} onClick={() => setToggleDeletePopup(false)}>Cancel</Link>
                        <Link className={classes.actionButton} onClick={() => handleDeleteUser(selectedUser)}>Delete user</Link>
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
                        <Link className={classes.cancelButton} onClick={() => setToggleUserPopup(false)}>Cancel</Link>
                        <Link className={classes.actionButton} onClick={() => handleRoleChange(selectedUser)}>Downgrade user</Link>
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
                        <Link className={classes.cancelButton} onClick={() => setToggleAdminPopup(false)}>Cancel</Link>
                        <Link className={classes.actionButton} onClick={() => handleRoleChange(selectedUser)}>Make user admin</Link>
                    </div>
                </div>
            )}
        </div>
    )
}