/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();

/* GET /api/courses 200 - Returns a list of courses (including the user that owns each course) */
router.get('/', function(req, res, next) {

  
});

/* GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID */
router.get('/:id', function(req, res, next) {
});

/* POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
 */
router.post('/', function(req, res, next) {
  
});

/* PUT /api/courses/:id 204 - Updates a course and returns no content */
router.put('/:id', function(req, res, next) {

});

/*DELETE /api/courses/:id 204 - Deletes a course and returns no content*/
router.delete('/:id', function(req, res, next) {

});


module.exports = router;