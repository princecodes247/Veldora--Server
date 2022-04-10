const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userID: {
        type: String,
        //required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    }
}, { timestamps: true});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;