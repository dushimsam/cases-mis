const mongoose = require('mongoose');
const joi = require('joi');
const { registerSchema } = require('swaggiffy');



const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

registerSchema('Disease',Schema,{orm:'mongoose'})
const Disease = mongoose.model('Disease', Schema);

const validateDisease = (data) => {
    const schema = {
        name: joi.string().required(),
    }
    return joi.validate(data, schema);
};

module.exports.validateDisease = validateDisease;
module.exports.Disease = Disease;
