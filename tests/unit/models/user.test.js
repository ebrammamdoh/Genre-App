
const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('return valid jwt', () => {  
        const obj = { _id: new mongoose.Types.ObjectId().toHexString()
            , isAdmin: true 
        };
        const user = new User(obj);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(obj);
    });
});