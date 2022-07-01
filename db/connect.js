const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Mongoose");
    })
    .catch(() => {
      console.log("Failed to connect to Mongoose");
    });
};

module.exports = connectDB;
