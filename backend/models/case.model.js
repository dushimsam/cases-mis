const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const joi = require('joi');
const {registerSchema} = require('swaggiffy')



const Schema = mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true
    },
    count:{
        type: Number,
        required: true,
        default: 0
    }
})

Schema.plugin(timestamps);
registerSchema('Case',Schema,{orm:'mongoose'})
const Case = mongoose.model('Case', Schema);

const validateCase = (data) => {
    const schema = {
        location_id: joi.objectId().required(),
        disease_id: joi.objectId().required(),
        count: joi.number().required()
    }
    return joi.validate(data, schema);
};

module.exports.validateCase = validateCase;
module.exports.Case = Case;