const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    token: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    last_name: { type: String, default: null },
    first_name: { type: String, default: null },
});

module.exports = mongoose.model('User', userSchema);
