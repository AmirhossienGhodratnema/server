const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema
const uniqueString = require('unique-string');
const { relativeTimeThreshold } = require('moment-jalaali');

// Register of user information.
const UserSchema = schema({
    name: { type: String, require: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, require: true },
    password: { type: String, require: true },
    rememberToken: { type: String, default: null },
    learning: [{ type: schema.Types.ObjectId, ref: 'Course' }],
    roles: [{ type: schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: true, toJSON: { virtuals: true } });


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
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(this.password , password)
};




// Set toket To remind login 
UserSchema.methods.setrememberToken = function (res) {
    const token = uniqueString()
    res.cookie('remember_token', token, { maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true, signed: true })
    this.updateOne({ rememberToken: token }, err => {
        console.log('err in remember token', err)
    });
};

UserSchema.methods.hasRole = function (role) {
    let result = roles.filter(role => {
        return this.roles.indexOf(role) > -1;
    })
    return !!result.length;
};





UserSchema.methods.isVip = function () {
    return false
}

UserSchema.methods.checkLearning = function (course) {
    return this.learning.indexOf(course.id) !== -1;
}


UserSchema.virtual('courses', { ref: 'Course', localField: '_id', foreignField: 'user' });


module.exports = mongoose.model("User", UserSchema);

