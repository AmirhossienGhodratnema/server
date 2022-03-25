const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const PermissionSchema = schema({
    name: { type: String, require: true },
    lable: { type: String, require: true },
}, { timestamps: true, toJSON: { virtuals: true } });

PermissionSchema.plugin(mongoosePaginate);

PermissionSchema.virtual('rolse', { ref: 'Role', localField: '_id', foreignField: 'permissions' });

module.exports = mongoose.model('Permission', PermissionSchema)