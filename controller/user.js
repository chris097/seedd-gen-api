const bcrypt = require('bcrypt');
const User = require('../model/user');

exports.registerUser = async (req, res, next) => {
    try {
        const { name, userName, email, password } = req.body;
        const user = new User({
            name: name,
            userName: userName,
            email: email,
            password: password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email) return res.status(400).json({message: "email is required."})
        if(!password) return res.status(400).json({message: "password is required."})
        const user = await User.findOne({ email: email });
        if (user) {
            const validateUser = await bcrypt.compare(password, user.password);
            if (validateUser) {
                return res.status(200).json({ message: "User successfully login"});
            } else {
                return res.status(400).json({ message: "password is incorrect"})
            }
        } else {
            res.status(400).json({message: "email is incorrect."})
        };
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
