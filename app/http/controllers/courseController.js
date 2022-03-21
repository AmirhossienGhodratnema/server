// Require
const Controller = require('./controller');

const Course = require('app/models/courses');
const Episodes = require('app/models/episodes');
const Comments = require('app/models/comments');
const User = require('app/models/user');
const Category = require('app/models/category');

module.exports = new class HomeController extends Controller {
    // Get home page view
    async courses(req, res) {
        try {
            let courses = await Course.find({})
            res.render('home/courses', { courses });
        } catch (err) {
            next(err);
        }
    };

    async about(req, res) {
        try {
            res.render('home/about-me');
        } catch (err) {
            next(err);
        }
    };

    async single(req, res, next) {
        try {
            let course = await Course.findById(req.params.id)
                .populate([
                    {
                        path: 'user',
                        select: ['name'],
                    },
                    {
                        path: 'episode',
                    }

                ])
                .populate([{
                    path: 'comments',
                    match: {
                        parent: null,
                        approved: true,
                    },
                    populate: [{
                        path: 'user',
                        select: 'name'
                    },
                    {
                        path: 'comments',
                        match: {
                            approved: true,
                        },
                        populate: [{ path: 'user', select: 'name' }]
                    }
                    ]
                },])

            let category = await Category.find({ parent: null }).populate('child')
            let canUse = await this.canUse(req, course);
            course.viewCount += 1;
            course.save();
            return res.render('home/single', { course, canUse, category });
        } catch (err) {
            next(err);
        }
    };


    async payment(req, res, next) {
        try {
            let { course } = req.body;
            this.isMongoId(course);

            let courses = await Course.findById(course);
            if(!courses) {
                console.log('not found');
            }


            if(await req.user.checkLearning(courses)){
                console.log('Shoma in dorera kharidari kardeed');
            }

            if(courses.price == 0 && (courses.type !== 'vip' || courses.type !== 'free')) {
                console.log('In dore ghable kharidan nist')
            }


            // buy proccess


            return res.json(req.body)
        } catch (err) {
            next(err)
        }
    }


    async search(req, res, next) {

        try {

            let query = {};

            if (req.query.search) {
                query.title = new RegExp(req.query.search, 'gi');
            }

            if (req.query.type && req.query.type !== 'all') {
                query.type = req.query.type
            }

            let courses = Course.find({ ...query });

            if (req.query.order) {
                courses.sort({ createdAt: -1 })
            }

            courses = await courses.exec();

            return res.render('home/search', { courses });

        } catch (err) {
            next(err);
        }
    }

    async canUse(req, course) {
        let canUse = false;
        if (req.isAuthenticated()) {
            switch (course.type) {
                case 'vip':
                    canUse = req.user.isVip()
                    break;
                case 'cash':
                    canUse = true
                    break;
                default:
                    break;
            }
        }
        return canUse
    }
};