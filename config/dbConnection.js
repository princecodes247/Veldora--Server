const mongoose = require("mongoose");

const connect = () => {
    const url =
      process.env.MONGODB_URI || `mongodb://localhost:27017/Veldora`;
    console.log("Establish new connection with url", url);
    mongoose.Promise = global.Promise;
    try {
      mongoose.connect(url);
    } catch (error) {
      console.log("Error connecting to database", error);      
    }
}

module.exports = connect