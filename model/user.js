const mongoose = require('mongoose');
const { isEmail } = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required."],
    },
    userName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "email is required."],
        minLength: [5, "email minimum length should be 5"],
        validate: [isEmail, "email is invalid"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required."],
        minLength: [5, "password minimum lenght should be 5"]
    },
    token: {
        type: String
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

