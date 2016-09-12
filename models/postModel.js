var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postModel = new Schema({
    title: {type: String},
    content: {type: String},
    author: {type: String},
    status: {type: String}
});

module.exports= mongoose.model('Post', postModel);