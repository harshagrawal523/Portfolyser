const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    project: {
        type: Array,
        required: true
    }
});

const Project = mongoose.model('project', projectSchema);
module.exports = Project;