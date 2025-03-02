const User = require('../../packages/user/userSchema');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getUser = async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id);
        if (!singleUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({
            data: {
                singleUser
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        };
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true });
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { role: newRole }, { new: true });
        res.send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    updateUserRole
}