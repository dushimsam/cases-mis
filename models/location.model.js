const mongoose = require('mongoose');
const joi = require('joi');


const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const Location = mongoose.Model('Location', Schema);

const validateLocation = (data) => {
    const schema = {
        name: joi.string().required(),
    }
    return joi.validate(data, schema);
};

module.exports.validateLocation = validateLocation;
module.exports.Location = Location;
