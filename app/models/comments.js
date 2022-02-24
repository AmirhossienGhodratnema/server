const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const CommetnSchema = schema({
    user: { type: schema.Types.ObjectId, ref: 'User' },
    parent: { type: schema.Types.ObjectId, ref: 'Comments', default: null },
    body: { type: String, require: true },
    approved: { type: Boolean, default: false },
    course: { type: schema.Types.ObjectId, ref: 'Course', default: undefined },
    episode: { type: schema.Types.ObjectId, ref: 'Episode', default: undefined },
}, { timestamps: true, toJSON: { virtuals: true } });

CommetnSchema.plugin(mongoosePaginate);


CommetnSchema.virtual('comments', { ref: 'Comments', localField: '_id', foreignField: 'parent' });


module.exports = mongoose.model('Comments', CommetnSchema);