const multer = require('multer');
const mkdirp = require('mkdirp');






const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1;
        let day = new Date().getDay()
        let dir = `./app/public/uploads/image/${year}/${month}/${day}`;

    
        mkdirp(dir).then(made => {
            cb(null, dir)
        })

    },

    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(file)
        cb(null, file.originalname)
    }
})



const uploadImage = multer({
    storage: ImageStorage
})


module.exports = uploadImage;

