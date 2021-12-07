const mongoose = require('mongoose');

const eduSchema = new mongoose.Schema({
    university: {
        type: Array,
        required: true
    },
    degree: {
        type: Array,
        required: true
    },
    percentage: {
        type: Array,
        required: true
    },
    degree_start: {
        type: Array,
        required: true
    },
    degree_end: {
        type: Array,
        required: true
    }
});

const Education = mongoose.model('education', eduSchema);
module.exports = Education;