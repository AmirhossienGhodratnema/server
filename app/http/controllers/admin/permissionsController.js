// Require
const Controller = require('./../controller')
const Permission = require('./../../../models/permission');


module.exports = new class PermissionsController extends Controller {
    async index(req, res, next) {
        try {
            let page = req.query.page || 1
            let permissions = await Permission.paginate({}, { page, sort: { createdAt: -1 }, limit: 10 })
            return res.render('admin/permission/index', { title: 'اجازه دسترسی', permissions });
        } catch (err) {
            next(err)
        }
    };


    async create(req, res, next) {
        try {
            let permissions = await Permission.find({})
            return res.render('admin/permission/create', { title: 'دسترسی جدید', permissions });
        } catch (err) {
            next(err)
        }
    };


    async store(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (status) {
                let newPermission = new Permission({ ...req.body });
                await newPermission.save(err => {
                    if (err) throw err;
                });
                return res.redirect('/admin/user/permissions');
            };
            return this.back(req, res);
        } catch (err) {
            next(err)
        }
    };


    async edit(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let permission = await Permission.findOne({ _id: req.params.id })
            if (!permission)
                throw new Error('چنین دوره ای وجود ندارد');
            return res.render('admin/permission/edit', { title: 'ویرایش اجازه دسترسی', permission })
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
            let permission = await Permission.findByIdAndUpdate(req.params.id, { ...req.body })
            await permission.save();
            return res.redirect('/admin/user/permissions')
        } catch (err) {
            next(err)
        }
    };

    
    async distroy(req, res, next) {
        try {
            let permission = await Permission.findById(req.params.id);
            if (!permission) {
                req.flash('massage', 'چنین دوره ای وجود ندارد');
            }
            permission.remove();
            return res.redirect('/admin/user/permissions')
        } catch (err) {
            next(err)
        }
    }
};