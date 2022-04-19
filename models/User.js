const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        //required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "",
        required: false,
    },
    country: {
        type: String,
        default: "",
        required: false,
    },
    accountType: {
        type: String,
        default: "user",
    },   
    password: {
        type: String,
        required: true,
    },
    role: Number,
    verified: { type: Number, default: 0},
    proMember: { type: Boolean, default: false},
    confirmationCode: Number
}, { timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;