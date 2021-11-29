const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, require: true },
    password: { type: String, require: true }
}, { timestamps: true });


UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, bcrypt.genSaltSync(15), (err, hash) => {
        this.password = hash;
        next()
    });
});


UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", UserSchema);

