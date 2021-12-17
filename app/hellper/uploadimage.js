const multer = require('multer');
const mkdirp = require('mkdirp');


const getDirImage = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1;
    let day = new Date().getDay()
    return `app/public/uploads/image/${year}/${month}/${day}`;
}


const ImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = getDirImage();

        mkdirp(dir)
            .then(made => {
                cb(null, dir);
            });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const uploadImage = multer({
    storage: ImageStorage
});


module.exports = uploadImage;

