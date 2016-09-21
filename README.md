# Blog Express JS Rest API

Rest Blog API with  unit testing and integration testing

- REST resources
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Unit Testing via [chai](http://chaijs.com/) and [sinon](http://sinonjs.org/)
- Integration Testing via [supertest](https://github.com/visionmedia/supertest)
- Database via [mongo](https://www.mongodb.com/) and [mongoose](http://mongoosejs.com/)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.


### Installing

A step by step series of examples that tell you have to get a development env running (windows 10)

Run Mongo

```
cd  C:\Program Files\MongoDB\Server\3.2\bin
run mongod 
```

Upload data to mongo

```
cd C:\Program Files\MongoDB\Server\3.2\bin
Copy booksJson.js to C:\Program Files\MongoDB\Server\3.2\bin 
mongo bookAPI < booksJson.js
```

Run API

```
npm install
gulp default
go to 
http://localhost:8000/api/stories
http://localhost:8000/api/stories/:storyId
http://localhost:8000/api/stories/:storyId/comments
http://localhost:8000/api/stories/:storyId/comments/:commentId
http://localhost:8000/api/users
http://localhost:8000/api/users/:userId

```



## Running the tests

Run

```
gulp test
```

## Authors

* **Sandro Sanchez** - *Initial work* - [Sandro Sanchez](https://github.com/sandropucp)

## License

This project is licensed under the MIT License

## Acknowledgments

* Inspiration: https://app.pluralsight.com/library/courses/node-js-express-rest-web-services/table-of-contents