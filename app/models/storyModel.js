var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = require('./commentModel').schema;    

const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

var storyModel = new Schema({
    title: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    author: { type: Schema.ObjectId, ref: 'User' },
    comments: [CommentSchema],
    tags: { type: [], get: getTags, set: setTags },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storyModel);