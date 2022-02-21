const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const CommetnSchema = schema({
    user: { type: schema.Types.ObjectId, ref: 'User' },
    user: { type: schema.Types.ObjectId, ref: 'Comments' },
    body: { type: String, require: true },
    show: { type: Boolean, default: false },
    course: { type: schema.Types.ObjectId, ref: 'Course' },
    

}, { timestamps: true, toJSON: { virtuals: true } });

CommetnSchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Comments', CommetnSchema);