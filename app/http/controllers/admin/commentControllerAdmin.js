const Controller = require("../controller");



module.exports = new class CommentsControllerAdmin extends Controller {
    index (req, res, next) {
        try {
            return res.render('admin/commentApproved.ejs')
            
        } catch (err) {
            next(err)
        }
    }
}