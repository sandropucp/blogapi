var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentModel = new Schema({
    commentid:{type: Number},
    postid:{type:Number},
    content: {type: String},
    author: {type: String},
    status: {type: String}
});

module.exports= mongoose.model('Comment', commentModel);