var { User } = require('../models/userModel');

var authenticate = (req, res, next) => {
    console.log('Testing..................');
    
    var token = req.header('x-auth');

    User.findByToken(token)
        .then((user) => {
            if (!user){
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            console.log(req.token);
            next();
        }).catch((e) => {
            res.status(401).send();
        });
};

module.exports = {authenticate};