const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const CourseSchema = schema({
    user: { type: schema.Types.ObjectId, ref: 'User' },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    type: { type: String, require: true },
    body: { type: String, require: true },
    images: { type: Object, require: true },
    fingerImage: { type: String, require: true },
    price: { type: String, require: true },
    tags: { type: String, require: true },
    time: { type: String, default: '00:00:00' },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: String, default: 0 },

}, { timestamps: true });

CourseSchema.plugin(mongoosePaginate);

CourseSchema.methods.typeToPersion = function () {
    switch (this.type) {
        case 'cash':
            return 'نقدی'
        case 'vip':
            return 'ویژه'
        default:
            return 'رایگان'
    }
}



module.exports = mongoose.model('Course', CourseSchema)