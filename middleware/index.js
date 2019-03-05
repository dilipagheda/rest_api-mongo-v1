const auth = require('basic-auth');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const authenticateUser = (req, res, next) => {
    let message = null;

    const credentials = auth(req);
    if (credentials) {
        console.log("credentials.name:"+credentials.name);
        console.log("credentials.pass:"+credentials.pass);
        
        User.findOne({emailAddress: credentials.name})
            .then((user)=>{
                //found user
                //now check the password
                console.log("Found user!"+user);
                const authenticated = bcryptjs
                    .compareSync(credentials.pass, user.password);
                if (authenticated) {
                    req.currentUser = user;
                    next();
                } else {
                    res.status(401).json({
                        message: 'Access Denied'
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(401).json({
                    message: 'Access Denied'
                });
            });
    } else {
        message = 'Auth header not found';
        // Return a response with a 401 Unauthorized HTTP status code.
        res.status(401).json({
            message: 'Access Denied'
        });
    }
    
}

module.exports = authenticateUser;