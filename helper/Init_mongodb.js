const mongoose = require("mongoose");
// const dotenv = require("dotenv");
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://prashant:smart@5116@cluster0.kdodc.mongodb.net", {
    dbName: "ImageToText",
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
  })
  .then(() => {
    console.log("mongodb connected.");
  })
  .catch((err) => console.log("error",err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

