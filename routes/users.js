/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const authenticateUser = require('../middleware/index');

/* GET /api/users 200 - Returns the currently authenticated user
 */
router.get('/', authenticateUser, function(req, res, next) {
    // User.find({},function(err,users){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.json(users);
    //     }
    // });
    console.log("outside:"+req.currentUser);
    res.json(req.currentUser);
});


/* POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content */
router.post('/', function(req, res, next) {
    // Get the user from the request body.
    const user = req.body;
    
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