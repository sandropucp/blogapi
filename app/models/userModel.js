var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },        
});

module.exports = mongoose.model('User', userModel);