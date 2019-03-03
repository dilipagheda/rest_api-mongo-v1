/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET /api/users 200 - Returns the currently authenticated user
 */
router.get('/', function(req, res, next) {
    User.find({},function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});


/* POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content */
router.post('/', function(req, res, next) {

  
});



module.exports = router;