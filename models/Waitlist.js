const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: "user",
    },
    rating: {
        type: Number,
        default: 0,
    },
}, { timestamps: true});

const Waitlist = mongoose.model('Waitlist', WaitlistSchema);
module.exports = Waitlist;