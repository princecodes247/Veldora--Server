const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    projects: {
        type: Array,
        default: []
    },
    level: {
        type: Number,
        default: 0,
    },   
    password: {
        type: String,
        required: true,
    },
    verified: { type: Boolean, default: false},
    proMember: { type: Boolean, default: false},
    confirmationCode: Number
}, { timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );
  
  UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

const User = mongoose.model('User', UserSchema);
module.exports = User;