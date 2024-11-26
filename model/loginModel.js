const mongoose = require('mongoose');

const LoginValidation = mongoose.Schema({
    username: String,
    password: {
        type: String,
        Unique: true,
        required: true
    },
    // passwordbryt: {
    //     type: String,
    //     required: true
    // } //required: true
});

const LoginModel = mongoose.model('Emprecord', LoginValidation);

//export default LoginModel

module.exports = LoginModel;