const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    company: {
        type: Array,
        required: true
    },
    work_description: {
        type: Array,
        required: true
    },
    work_start: {
        type: Array,
        required: true
    },
    work_end: {
        type: Array,
        required: true
    }
});

const Work = mongoose.model('work', workSchema);

module.exports = Work;