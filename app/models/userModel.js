var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },        
    password: { type: String, default: '' },        
    birthYear: { type: Number, default: 0 },        
});

module.exports = mongoose.model('User', userModel);