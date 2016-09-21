var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = require('./commentModel').schema;    

var storyModel = new Schema({
    title: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    author: { type: Schema.ObjectId, ref: 'User' },
    comments: [CommentSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storyModel);