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
router.put('/:id', authenticateUser ,function(req, res, next) {
    const data = {title:req.body.title,
                description:req.body.description,
                estimatedTime:req.body.estimatedTime,
                materialsNeeded:req.body.materialsNeeded
            };

    
    console.log("user id:"+req.currentUser._id);
    Course.findById(req.params.id)
          .then(course=>{
            console.log(course);
            if(req.currentUser._id.equals(course.user)){
                console.log("equals");
                course.title = req.body.title;
                course.description = req.body.description;
                course.estimatedTime=req.body.estimatedTime;
                course.materialsNeeded=req.body.materialsNeeded;
                return course.save();
                
            }else{
                console.log("not equals");
                reject(new Error());
            }
          })
          .then((result)=>{
                console.log("result:"+result);
                res.status(204).end();
          })
          .catch(err=>{
            res.status(404).json({
                message: 'Course not found for this user!',
              }); 
          });

    // Course.updateMany({_id:req.params.id, user:req.currentUser._id},{...data} , function(err,course){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("course:"+ JSON.stringify(course));
    //         if(course.nModified>0){
    //             res.status(204).end();
    //         }else{
    //             res.status(404).json({
    //                 message: 'Course not found for this user!',
    //               });
    //         }
            
            
    //     }
    // });
});

/*DELETE /api/courses/:id 204 - Deletes a course and returns no content*/
router.delete('/:id', function(req, res, next) {

});


module.exports = router;