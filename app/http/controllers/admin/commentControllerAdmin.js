const Controller = require("../controller");

const Comments = require('./../../../models/comments')

module.exports = new class CommentsControllerAdmin extends Controller {
    async index(req, res, next) {
        try {


            let page = req.query.page || 1
            let comments = await Comments.paginate({}, { page, sort: { createdAt: -1 }, limit: 6, populate: [{ path: 'user', select: 'name' }, { path: 'course', select: 'title' }] })

            // return res.json(comments);

            return res.render('admin/commentApproved.ejs', { comments })

        } catch (err) {
            next(err)
        }
    }
}