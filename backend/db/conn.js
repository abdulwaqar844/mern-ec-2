const mongoose = require("mongoose");
const MongoURL = "mongodb://localhost:27017/tutorial";
const DBConn = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Connection Created at" ,process.env.MONGO_URI );
    return conn;
  } catch (error) {
    return error.message;
  }
};
module.exports = {
  DBConn,
};
