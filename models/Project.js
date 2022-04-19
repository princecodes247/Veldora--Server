const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectTag: {
        type: String,
        required: true,
    },
    projectDesc: {
        type: String,
        required: true,
    },
    projectIcon: {
        type: String,
        default: "user",
    },
    store: {
        type: Array,
        default: [],
    },
    storeSchema: {
        type: Object,
        required: true,
    },
    projectType: {
        type: String,
        default: "user",
    },
}, { timestamps: true});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;