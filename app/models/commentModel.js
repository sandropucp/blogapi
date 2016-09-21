var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentModel = new Schema({
        body: { type: String, default: '' },
        author: { type: Schema.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }        
});

module.exports = mongoose.model('Comment', commentModel);