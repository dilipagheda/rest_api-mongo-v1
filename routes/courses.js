/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const authenticateUser = require('../middleware/index');

/* GET /api/courses 200 - Returns a list of courses (including the user that owns each course) */
router.get('/', function(req, res, next) {
    Course.find({})
        .populate('user')
        .exec(function(err,courses){
            res.json(courses);
        });
});

/* GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID */
router.get('/:id', function(req, res, next) {
    Course.findById(req.params.id)
    .populate('user')
    .exec(function(err,courses){
        res.json(courses);
    });
});

/* POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
 */
router.post('/', authenticateUser , function(req, res, next) {
  Course.create({
      user:req.currentUser._id,
      title:req.body.title,
      description:req.body.description,
      estimatedTime:req.body.estimatedTime,
      materialsNeeded:req.body.materialsNeeded
  })
  .then(course=>{
    res.setHeader("Location",`/api/courses/${course._id}`);
    res.status(201).end();
  })
  .catch(err=>{

  });
});

/* PUT /api/courses/:id 204 - Updates a course and returns no content */
router.put('/:id', function(req, res, next) {

});

/*DELETE /api/courses/:id 204 - Deletes a course and returns no content*/
router.delete('/:id', function(req, res, next) {

});


module.exports = router;