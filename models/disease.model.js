const mongoose = require('mongoose');
const joi = require('joi');
const { registerSchema } = require('swaggiffy');



const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const Disease = mongoose.Model('Disease', Schema);
registerSchema('Disease',Disease,{orm:'mongoose'})

const validateDisease = (data) => {
    const schema = {
        name: joi.string().required(),
    }
    return joi.validate(data, schema);
};

module.exports.validateDisease = validateDisease;
module.exports.Disease = Disease;
