var mongoose = require('mongoose');
var user = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 10
    }

});

module.exports = {user};