const express = require("express");
const app = express();
const conn = require("./models/dbconnection.js");
require("dotenv").config();
const cookie = require('cookie-parser')
// const Auth = require("./middleware/auth.js")
const PORT = 5000;

//accept json
app.use(express.json())

//accept body
app.use(express.urlencoded({extended:true}))
 app.use(cookie())

app.use(require("./Routes/Route.js"));
const auth = require("./middleware/auth.js")
app.use(auth);


app.get("/",auth,(req, res) => {
  res.send("this is kj home page");
});


app.post("/Asignup", (req, res) => {
  res.send("this is my admin signup page");
});

app.post("/Alogin", (req, res) => {
  res.send("this is my admin login page");
});

app.post("/Usignup", (req, res) => {
  res.send("this is my user signup page");
});

app.post("/Ulogin", (req, res) => {
  res.send("this is my user login page");
});

app.post("/logout", (req, res) => {
  res.send("log-out");
});

app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});
