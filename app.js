var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db;
console.log('Hello from Blog API 2');
if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/blogAPI_test');
}

else{
    //db= mongoose.connect('mongodb://localhost/blogAPI');
    db= mongoose.connect('mongodb://sandro:sandro03@ds044679.mlab.com:44679/bookapi');
}

var app = express();
var port = process.env.PORT || 3000;

var Post = require('./models/postModel');
postRouter = require('./Routes/postRoutes')(Post);

var Comment = require('./models/commentModel');
commentRouter = require('./Routes/commentRoutes')(Comment);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/posts', postRouter); 
app.use('/api/comments', commentRouter); 

app.get('/', function(req, res){
    res.send('welcome to my Blog API V3!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app; 
