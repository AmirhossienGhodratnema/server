const mongoose = require('mongoose');



const UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, require: true },
    password: { String, require: true }
}, { timestamps: true });



module.exports = mongoose.model('User', UserSchema);