const mongoose = require('mongoose');
const joi = require('joi');
const { registerSchema } = require('swaggiffy');


const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

registerSchema('Location',Schema,{orm:'mongoose'})

const Location = mongoose.model('Location', Schema);

const validateLocation = (data) => {
    const schema = {
        name: joi.string().required(),
    }
    return joi.validate(data, schema);
};

module.exports.validateLocation = validateLocation;
module.exports.Location = Location;
