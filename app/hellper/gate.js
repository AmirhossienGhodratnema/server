let ConnectRoles = require('connect-roles');
let Permissions = require('./../models/permission')


let gate = new ConnectRoles({
    failureHandler: function (req, res, action) {

        var accept = req.headers.accept || '';
        res.status(403);
        if (accept.indexOf('html')) {
            res.render('admin/error/403', { action });
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});



const permissions = async () => {
    return await Permissions.find({}).populate('rolse').exec();
}


// permissions()
//     .then(permissions => {
//             permissions.forEach(per => {
//                 console.log('per' , per.role)
//             });
//         })



    // .then(permission => {
    //     let roles = permission.role.map(role => {
    //         gate.use(permission.name, (req) => {
    //             return (req.isisAuthenticatedAuth())
    //                 ? req.user.hasRole(role)
    //                 : false
    //         })
    //     })
    // })



module.exports = gate;