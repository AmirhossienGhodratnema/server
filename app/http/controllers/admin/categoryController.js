// Require
const { relativeTimeRounding } = require('moment-jalaali');
const Controller = require('./../controller')

const Category = require('./../../../models/category');

module.exports = new class AdminController extends Controller {


    async index(req, res, next) {
        try {


            let page = req.query.page || 1
            let categories = await Category.paginate({}, { page, sort: { createdAt: -1 }, limit: 10, populate: 'parent' })


            // return res.json(categories)
            return res.render('admin/category', { categories })
        } catch (err) {
            next(err)
        }
    };


    async create(req, res, next) {
        try {

            let categories = await Category.find({ parent: null })

            return res.render('admin/category/create', { categories });
        } catch (err) {
            next(err)
        }
    }



    async store(req, res, next) {
        try {
            let result = await this.validationData(req);

            console.log('result', result);
            console.log('req.body', req.body);

            if (result) {

                let { name, parent } = req.body;

                let newCategory = new Category({
                    name,
                    parent: parent == 'none' ? null : parent,
                });

                await newCategory.save(err => {
                    if (err) throw err;
                });

                return res.redirect('/admin/categories');
            };
            return this.back(req, res);
        } catch (err) {
            next(err)
        }
    };


    async distroy(req, res, next) {
        try {

            let category = await Category.findById(req.params.id).populate('child');

            if (!category) {
                req.flash('massage', 'چنین دسته ای وجود ندارد');
            }

            

            category.child.forEach(item => {
                item.remove()
            });


            category.remove();

            return this.back(req, res)

        } catch (err) {
            next(next);
        }
    }


    async edit(req, res, next) {
        try {

            let category = await Category.findById(req.params.id);
            let categories = await Category.find({ parent: null })

            return res.render('admin/category/edit', { category, categories })
        } catch (err) {
            next(err);
        }
    }




};