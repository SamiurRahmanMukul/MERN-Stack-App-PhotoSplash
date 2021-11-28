// external modules import
const mongoose = require("mongoose");

// make a function to connect to the mongoDB
const connectDB = (uri) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// module export
module.exports = connectDB;
