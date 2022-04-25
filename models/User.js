const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    projects: {
        type: Array,
        default: []
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
    verified: { type: Boolean, default: false},
    proMember: { type: Boolean, default: false},
    confirmationCode: Number
}, { timestamps: true});



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