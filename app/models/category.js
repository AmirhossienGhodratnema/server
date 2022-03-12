const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const CategorySchema = schema({
    name: { type: String, require: true },
    parent: { type: schema.Types.ObjectId, ref: 'Category', default: null },
}, { timestamps: true, toJSON: { virtuals: true } });

CategorySchema.plugin(mongoosePaginate);

CategorySchema.virtual('child', { ref: 'Category', localField: '_id', foreignField: 'parent' });


module.exports = mongoose.model('Category', CategorySchema);