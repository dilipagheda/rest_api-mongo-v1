/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {authenticateUser,checkDuplicateEmail} = require('../middleware/index');
const { check, validationResult } = require('express-validator/check');

/* GET /api/users 200 - Returns the currently authenticated user
 */
router.get('/', authenticateUser, function(req, res, next) {
    res.json(req.currentUser);
});
/* POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content 
 Validations: Email should be of correct format
              Email should not have been used.
 Hash the password before storing
*/
router.post('/' , check('emailAddress').isEmail().withMessage("Email address is not valid!") , checkDuplicateEmail  , function(req, res, next) {

    //Email format validation
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(JSON.stringify(err.array()));
        let e = new Error();
        e.message = err.array();
        e.status = 400;
        return  next(e);
    }

    // Get the user from the request body & Validate against Schema
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.emailAddress = req.body.emailAddress;
    user.password = req.body.password;
    const errors = user.validateSync();
    if(errors){
        errors.status=400;
        return next(errors);
    }
    // Hash the new user's password.
    user.password = bcryptjs.hashSync(user.password);
    
    //Store user info in the database.
    User.create(user)
        .then((user)=>{
            //saved
            //Set the location header to /
            res.setHeader("Location","/");
            // Set the status to 201 Created and end the response.
            return res.status(201).end();
        })
        .catch((err)=>{
            return next(err);
        });
});

module.exports = router;