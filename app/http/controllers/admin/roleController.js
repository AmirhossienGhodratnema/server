// Require
const Controller = require('./../controller')
const Role = require('./../../../models/role');
const Permission = require('./../../../models/permission');


module.exports = new class RoleController extends Controller {
    async index(req, res, next) {
        try {
            let page = req.query.page || 1
            let roles = await Role.paginate({}, { page, sort: { createdAt: 1 }, limit: 10 });
            return res.render('admin/role/index', { title: 'سطح دسترسی', roles });
        } catch (err) {
            next(err)
        }
    };

   


    async create(req, res, next) {
        try {
            let permissions = await Permission.find({})
            return res.render('admin/role/create', { title: 'سطح دسترسی جدید', permissions });
        } catch (err) {
            next(err)
        }
    };


    async store(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (status) {
                let newRole = new Role({ ...req.body });
                await newRole.save(err => {
                    if (err) throw err;
                });
                return res.redirect('/admin/user/role');
            };
            return this.back(req, res);
        } catch (err) {
            next(err)
        }
    };


    async edit(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let permissions = await Permission.find({})
            let role = await Role.findOne({ _id: req.params.id })
            if (!role)
                throw new Error('چنین دوره ای وجود ندارد');
            return res.render('admin/role/edit', { title: 'ویرایش سطح دسترسی', role, permissions })
        } catch (err) {
            next(err)
        }
    };


    async update(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) {
                return this.back(req, res)
            };

            console.log('req.body', req.body)
            let role = await Role.findByIdAndUpdate(req.params.id, { ...req.body })
            await role.save();
            return res.redirect('/admin/user/role')
        } catch (err) {
            next(err)
        }
    };


    async distroy(req, res, next) {
        try {
            let role = await Role.findById(req.params.id);
            if (!role) {
                req.flash('massage', 'چنین دوره ای وجود ندارد');
            }
            role.remove();
            return res.redirect('/admin/user/role')
        } catch (err) {
            next(err)
        }
    }
};