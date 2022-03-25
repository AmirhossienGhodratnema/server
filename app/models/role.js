const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const RoleSchema = schema({
    name: { type: String, require: true },
    lable: { type: String, require: true },
    permissions : [{type : schema.Types.ObjectId , ref : 'Permission'}]
}, { timestamps: true });

RoleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Role', RoleSchema)