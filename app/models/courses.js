const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const CourseSchema = schema({
    user: { type: schema.Types.ObjectId, ref: 'User' },
    categories: [{ type: schema.Types.ObjectId, ref: 'Category' }],
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
    commentCount: { type: Number, default: 0 },

}, { timestamps: true, toJSON: { virtuals: true } });

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

CourseSchema.methods.inc = async function () {
    console.log('inc inc inc inc inc inc inc inc inc inc ')
}

CourseSchema.virtual('episode', { ref: 'Episodes', localField: '_id', foreignField: 'course' });
CourseSchema.virtual('comments', { ref: 'Comments', localField: '_id', foreignField: 'course' });

module.exports = mongoose.model('Course', CourseSchema);