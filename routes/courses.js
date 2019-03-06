/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const {authenticateUser} = require('../middleware/index');

/* GET /api/courses 200 - Returns a list of courses (including the user that owns each course) 
   Include user details such that it only contains first name and last name
*/
router.get('/', function (req, res, next) {
    Course.find({})
        .populate({
            path: 'user',
            select: 'firstName lastName'
        })
        .exec(function (err, courses) {
            if(err) return next(err);
            res.json(courses);
        });
});
/* GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID 
   Include user details such that it only contains first name and last name
*/
router.get('/:id', function (req, res, next) {
    Course.findById(req.params.id)
        .populate({
            path: 'user',
            select: 'firstName lastName'
        })
        .exec(function (err, courses) {
            if(err) return next(err);
            res.json(courses);
        });
});
/* POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
 */
router.post('/', authenticateUser, function (req, res, next) {
    // Get the user from the request body & Validate against Schema
    const course = new Course();
    course.title = req.body.title;
    course.description = req.body.description;
    const errors = course.validateSync();
    if (errors) {
        errors.status = 400;
        return next(errors);
    }
    Course.create({
            user: req.currentUser._id,
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded
        })
        .then(course => {
            res.setHeader("Location", `/api/courses/${course._id}`);
            res.status(201).end();
        })
        .catch(err => {
            if(err) return next(err);
        });
});

/* PUT /api/courses/:id 204 - Updates a course and returns no content */
router.put('/:id', authenticateUser, function (req, res, next) {
    const data = {
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
    };
    Course.updateMany({_id: req.params.id,user: req.currentUser._id}, { ...data}, function (err, result) {
        if (err) {
            next(err);
        } else {
            if (result.nModified > 0) {
                res.status(204).end();
            } else {
                res.status(403).json({
                    message: 'Course not found for this user!',
                });
            }
        }
    });
});

/*DELETE /api/courses/:id 204 - Deletes a course and returns no content*/
router.delete('/:id', authenticateUser, function (req, res, next) {
    Course.deleteMany({ _id: req.params.id,user: req.currentUser._id}, function (err, result) {
        if (err) {
            next(err);
        } else {
            if (result.deletedCount > 0) {
                res.status(204).end();
            } else {
                res.status(403).json({
                    message: 'Course not found for this user!',
                });
            }
        }
    });
});

module.exports = router;