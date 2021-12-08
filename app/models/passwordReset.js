const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

// Register of user information.
const PasswordReset = mongoose.Schema({
    email: { type: String, require: true },
    token: { type: String, require: true },
    use: { type: Boolean, default: false }

}, { timestamps: { updatedAt: false } });


module.exports = mongoose.model("passwordReset", PasswordReset);

