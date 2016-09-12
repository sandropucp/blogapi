# Project Title

Simple Express JS API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


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
go to http://localhost:8000/api/posts
```



## Running the tests

Run

```
gulp test
```

## Authors

* **Sandro Sanchez** - *Initial work* - [Sandro Sanchez](https://github.com/sandropucp)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspiration: https://app.pluralsight.com/library/courses/node-js-express-rest-web-services/table-of-contents