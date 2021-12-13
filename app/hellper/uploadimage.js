const multer = require('multer');
const mkdirp = require('mkdirp');

const getDirImage = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1;
    let day = new Date().getDay()
    return `./app/public/uploads/image/${year}/${month}/${day}`;
}




const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        let dir = getDirImage()

        mkdirp(dir).then(made => {
            cb(null, dir)
        })

    },

    filename: (req, file, cb) => {

        cb(null, file.originalname)
    }
})



const uploadImage = multer({
    storage: ImageStorage
})


module.exports = uploadImage;

