const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');


const UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, require: true },
    password: { type: String, require: true },
    rememberToken: { type: String, default: null }
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

UserSchema.methods.setrememberToken = function(res) {
    const token = uniqueString()
    res.cookie('remember_token', token , {maxAge: 1000*60*60*24*90 , httpOnly: true});
    this.update({rememberToken , token} , err => {
        console.log('err in remember token'  , err)
    })
    console.log(token)
}

module.exports = mongoose.model("User", UserSchema);

