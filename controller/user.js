const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendEmail');

const { JWT_TOKEN } = process.env;

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
        const token = jwt.sign({ _id: user._id, email }, JWT_TOKEN, { expiresIn: '1h' })
        user.token = token;
        await user.save();
        res.status(201).json(user)
        sendMail(email, "you successfully register", '<p>you successfully register</p>')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ message: "email is required." })
        if (!password) return res.status(400).json({ message: "password is required." })
        const user = await User.findOne({ email: email });
        const token = jwt.sign({ _id: user._id, email }, JWT_TOKEN, { expiresIn: '1h' })
        user.token = token;
        if (user) {
            const validateUser = await bcrypt.compare(password, user.password);
            if (validateUser) {
                return res.status(200).json({ message: "User successfully login" });
            } else {
                return res.status(400).json({ message: "password is incorrect" })
            }
        } else {
            res.status(400).json({ message: "email is incorrect." })
        };
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "No account with such email found" })
        const token = jwt.sign({ _id: user._id, email }, JWT_TOKEN, { expiresIn: '1h' });
        user.token = token;
        return user.save()
            .then(result => {
                sendMail(email, 'Reset Password', `<p><a href="http://localhost/5400/reset/${token}">Click</a> have have been sent your mail</p>`)
                res.status(200).json({message: "Mail sent."})
            })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};



