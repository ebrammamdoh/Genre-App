
function Admin(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('forbidden');
    next();
};

module.exports.Admin = Admin;