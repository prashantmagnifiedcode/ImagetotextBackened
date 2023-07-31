const express = require("express");
const app = express();
require("./helper/Init_mongodb.js")
const userrouter = require("./router/user.js")
const cors = require("cors");
app.use(express.json());


app.use(cors()) 


  //api routing 
app.use("/api/user", userrouter)

app.listen(process.env.PORT||5000, _=> console.log("backend server is running on port: "+ process.env.PORT))


