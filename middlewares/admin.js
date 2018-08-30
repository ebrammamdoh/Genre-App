module.exports = function(req, res, nxt){
    if(!req.user.isAdmin) return res.status(403).send('forbidden');
    nxt();
}