var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storyModel = new Schema({
    title: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    author: { type: Schema.ObjectId, ref: 'User' },
    comments: [{
        body: { type: String, default: '' },
        author: { type: Schema.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storyModel);