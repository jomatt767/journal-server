const jwt = require('jsonwebtoken');
const user = require('../models/user');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', decodeToken);
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
          console.log('decodeToken -->', decodeToken);
            if (!err && decodeToken) {
                user.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                  console.log('user -->', user);
                    if(!user) throw err;
                  console.log('req -->', req);
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};
module.exports = validateSession;