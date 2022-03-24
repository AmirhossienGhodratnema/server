const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const PermissionSchema = schema({
    name: { type: String, require: true },
    lable: { type: String, require: true },
}, { timestamps: true });

PermissionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Permission', PermissionSchema)