const express = require("express");

const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const acc = require("./routers/routerAcc"); // Import the login router
const event = require("./routers/routerEvent");
const sending = require("./Action/Sending");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/acc", acc);
app.use("/event",event);
//app.use("/sending",sending);


app.get("/acc", (req, res) => {
  res.sendFile(__dirname + "/frontend/html/login.html");
});

app.get("/trangchu", (req, res) => {
  res.sendFile(__dirname + "/frontend/html/trangchu.html");
});

app.get("/trangchuAdmin", (req, res) => {
  res.sendFile(__dirname + "/frontend/html/trangchuAdmin.html");
});


app.get("/personal",(req,res)=>{
  res.sendFile(__dirname + "/frontend/html/personal.html");
})



module.exports = app;
