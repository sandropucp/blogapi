const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = require('./commentModel').schema;

var StorySchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    body: {
        type: String,
        require: true,
        trim: true
    },
    author: {
        type: Schema.ObjectId,
        require: true,
        ref: 'User'
    },
    comments: [CommentSchema],
    tags: [{
        type: Schema.ObjectId,        
        ref: 'Tag'
    }],
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Story', StorySchema);
