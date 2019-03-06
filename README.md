# Project 9 - Treehouse Fullstack JavaScript Techdegree
# REST API
## Project Spec
In this project, you’ll create a REST API using Express. The API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database.

In addition, the project will require users to create an account and log-in to make changes to the database.

To complete this project, you’ll use your knowledge of REST API design, Node.js, and Express to create API routes, along with the Mongoose ORM for data modeling, validation, and persistence. To test your application, you'll use Postman, a popular application for exploring and testing REST APIs.

## How to set up locally
1. Clone this project using this link:
https://github.com/dilipagheda/rest_api-mongo-v1.git
2. Run `npm install` which will download all project dependancies
3. Make sure that mongoDB is installed and running
4. If your mongoDB is running on different port or machine then changes this line in `database.js`
```    
this.context = new Context('mongodb://localhost:27017', enableLogging);
```
5. Run node ./seed to create database and load some data.
6. Run `npm start` to start the project.
7. Open POSTMAN and hit endpoints using `localhost:3000`
8. Have fun!

## Endpoints

### Users Schema
- GET /api/users 200 - Returns the currently authenticated user

- POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

### Courses Schema
- GET /api/courses 200 - Returns a list of courses (including the user that owns each course)

- POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content

- PUT /api/courses/:id 204 - Updates a course and returns no content

- DELETE /api/courses/:id 204 - Deletes a course and returns no content

## Technolgies used
- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript

## Notes
- Postman collection file is included in the repo.
`RESTAPI.postman_collection.json`




