// Require
const Controller = require("./controller");

const Course = require("app/models/courses");
const Episodes = require("app/models/episodes");
const User = require("app/models/user");
const Comments = require("app/models/comments");

module.exports = new class HomeController extends Controller {

    // Get home page view
    async index(req, res, next) {
        try {
            let validation = await this.validationData(req);
            console.log(req.body)
            if (validation) {
                let newCommetn = Comments({
                    user: req.user.id,
                    ...req.body
                })
                await newCommetn.save(err => {
                    if (err) throw err;
                });
            };

            return res.redirect(`/courses/${req.body.course}`);

        } catch (err) {
            next(err);
        }
    }



};