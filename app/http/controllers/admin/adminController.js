// Require
const Controller = require('./../controller')

module.exports = new class AdminController extends Controller {
    index(req, res, next) {
        try {
            res.render('admin/index', { title: 'پنل ادمین' })
        } catch (err) {
            next(err)
        }
    };


    uploadImage(req, res) {
        let image = req.file;

        console.log('image ', image)
        res.json({
            'uploaded': 1,
            'filename': image.originalname,
            'url': `${image.destination}/${image.filename}`.substring(10)

        })
    }
};