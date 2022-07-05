const mongoose = require('mongoose');
const joi = require('joi');
const { registerSchema } = require('swaggiffy');


const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const Location = mongoose.Model('Location', Schema);
registerSchema('Location',Location,{orm:'mongoose'})

const validateLocation = (data) => {
    const schema = {
        name: joi.string().required(),
    }
    return joi.validate(data, schema);
};

module.exports.validateLocation = validateLocation;
module.exports.Location = Location;
