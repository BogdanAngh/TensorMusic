const mongoose = require ('mongoose');

const { Schema } = mongoose; // get mongoose.Schema obj

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: (Date.now() + 72000000)
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;