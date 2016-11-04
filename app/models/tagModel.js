const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Tag', TagSchema);