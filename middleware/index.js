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

const checkDuplicateEmail = (req,res,next) => {
    const email = req.body.emailAddress;
    User.find({emailAddress:email})
        .then(users=>{
            if(users!==undefined && users.length>0){
                let err=new Error();
                err.status = 400;
                err.message = "Duplicate Email!";
                return next(err);
            }else{
                next();
            }
        })
        .catch(err=>{
            next(err);
        });

}

module.exports.authenticateUser = authenticateUser;
module.exports.checkDuplicateEmail = checkDuplicateEmail;