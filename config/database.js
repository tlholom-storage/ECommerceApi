const mongoose = require("mongoose");

const MONGO_URI = `mongodb://${process.env.COSMOSDB_ACCOUNT_NAME}:${process.env.COSMOSDB_KEY}@${process.env.COSMOSDB_HOST}:${process.env.COSMOSDB_PORT}/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${process.env.COSMOSDB_ACCOUNT_NAME}@`;


exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.error(error);
      console.log("database connection failed. exiting now...");
      process.exit(1);
    });
};