const jwt = require('jsonwebtoken');
const config = require('config');

function Auth(req,res,nxt){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('token not provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        nxt();
    }
    catch(ex){
        res.status(400).send('not valid token');
    }
}

module.exports.Auth = Auth;