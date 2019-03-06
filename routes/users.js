/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const authenticateUser = require('../middleware/index');

/* GET /api/users 200 - Returns the currently authenticated user
 */
router.get('/', authenticateUser, function(req, res, next) {
    res.json(req.currentUser);
});


/* POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content */
router.post('/' , function(req, res, next) {

    // Get the user from the request body & Validate against Schema
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.emailAddress = req.body.emailAddress;
    user.password = req.body.password;
    const errors = user.validateSync();
    if(errors){
        return next(errors);
    }
    // Hash the new user's password.
    user.password = bcryptjs.hashSync(user.password);
    
    //Store user info in the database.
    User.create(user)
        .then((user)=>{
            //saved
            console.log("Saved:"+user);
        })
        .catch((err)=>{
            console.log("Error while saving!"+err);
        });

    //Set the location header to /
    res.setHeader("Location","/");
    // Set the status to 201 Created and end the response.
    return res.status(201).end();
});



module.exports = router;