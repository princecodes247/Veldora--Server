const mongoose = require("mongoose");

const connect = () => {
    let DB_URI =`mongodb://localhost:27017/veldora`;
    if (process.env.NODE_ENV === "production") {
        DB_URI = `mongodb+srv://${process.env.DB_USER}:${
            process.env.DB_PASS
        }@cluster0-qjvqw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    }
    console.log("Establish new connection with url", DB_URI);
    mongoose.Promise = global.Promise;
    // mongoose.set("useNewUrlParser", true);
    // mongoose.set("useFindAndModify", false);
    // mongoose.set("useCreateIndex", true);
    // mongoose.set("useUnifiedTopology", true);
    mongoose.connect(DB_URI);
}

module.exports = connect