const mongoose = require('mongoose');
let schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


const EpisodesSchema = schema({
    course: { type: schema.Types.ObjectId, ref: 'Course' },
    title: { type: String, require: true },
    type: { type: String, require: true },
    body: { type: String, require: true },
    time: { type: String, default: '00:00:00' },
    number: { type: Number, require: true },
    videoUrl: { type: String, require: true },
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: String, default: 0 },

}, { timestamps: true });

EpisodesSchema.plugin(mongoosePaginate);

EpisodesSchema.methods.typeToPersion = function () {
    switch (this.type) {
        case 'cash':
            return 'نقدی'
        case 'vip':
            return 'ویژه'
        default:
            return 'رایگان'
    }
}



module.exports = mongoose.model('Episodes', EpisodesSchema)