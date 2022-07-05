const mongoose = require('mongoose');
const joi = require('joi');
const {joiPassword} = require('joi-password');


const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

})


const User = mongoose.Model('User', Schema);

const validateUser = (user) => {
    const schema = {
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joiPassword().minUpperCase(1).minLowerCase(1).minDigits(1).required(),
    }
    return joi.validate(user, schema);
};

module.exports.validateUser = validateUser;
module.exports.User = User;
