const mongoose = require('mongoose');
const joi = require('joi');



const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const Disease = mongoose.Model('Disease', Schema);

const validateDisease = (data) => {
    const schema = {
        name: joi.string().required(),
    }
    return joi.validate(data, schema);
};

module.exports.validateDisease = validateDisease;
module.exports.Disease = Disease;
