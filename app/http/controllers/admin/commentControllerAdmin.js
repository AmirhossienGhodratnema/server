const Controller = require("../controller");

const Comments = require('./../../../models/comments')

module.exports = new class CommentsControllerAdmin extends Controller {
    async index(req, res, next) {
        try {
            let page = req.query.page || 1
            let comments = await Comments.paginate({ approved: true }, { page, sort: { createdAt: -1 }, limit: 6, populate: [{ path: 'user', select: 'name' }, { path: 'course', select: 'title' }] })
            return res.render('admin/comment.ejs', { comments })
        } catch (err) {
            next(err)
        }
    }



    async distroy(req, res, next) {
        try {
            let comments = await Comments.findById(req.params.id)
            if (!comments) {
                req.flash('massage', 'چنین دوره ای وجود ندارد');
                console.log('Not Course');
            }
            comments.remove();
            return this.back(req, res)
            // res.redirect('/admin/comments');
        } catch (err) {
            next(err)

        }
    }

    async update(req, res, next) {
        let comments = await Comments.findById(req.params.id)
        if (!comments) {
            req.flash('massage', 'چنین دوره ای وجود ندارد');
        }

        comments.approved = true;
        await comments.save();
        return this.back(req, res);
        // return res.json(comments);
    }


    async approved(req, res, next) {
        try {
            let page = req.query.page || 1
            let comments = await Comments.paginate({ approved: false }, { page, sort: { createdAt: -1 }, limit: 6, populate: [{ path: 'user', select: 'name' }, { path: 'course', select: 'title' }] })
            return res.render('admin/commentApproved.ejs', { comments })
        } catch (err) {
            next(err)
        }
    }

}