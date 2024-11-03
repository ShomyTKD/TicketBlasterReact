const User = require('../../packages/user/userSchema');

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
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports = {
    getUsers,
    getUser,
    updateUser
}