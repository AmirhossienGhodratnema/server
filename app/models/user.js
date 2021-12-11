const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

// Register of user information.
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rememberToken: { type: String, default: null }
}, { timestamps: true });


// Password hashing create user.
UserSchema.pre('save', function (next) {

    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.password, salt);


    this.password = hash;



    next()
});


// Password hashing change password user.
UserSchema.pre('findOneAndUpdate', function (next) {
    let password = this.getUpdate().$set.password

    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;

    next()
});

// Hashed password validation.
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};


// Set toket To remind login 
UserSchema.methods.setrememberToken = function (res) {
    const token = uniqueString()
    res.cookie('remember_token', token, { maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true, signed: true })
    this.updateOne({ rememberToken: token }, err => {
        console.log('err in remember token', err)
    });
};

module.exports = mongoose.model("User", UserSchema);

