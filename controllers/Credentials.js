const express = require("express");
const app = express();
app.use(express.json());
const Admin = require("../models/adminSchema.js");
const User = require("../models/userSchema.js");

const jwt = require("jsonwebtoken");

const Asignup = async (req, res) => {
  const { name, course, branch, email, password, cpassword } = req.body;
  try {
    if (!(name || course || branch || email || password || cpassword)) {
      return res.send("Enter the Credentials");
    }
    if (password != cpassword) {
      return res.send("Password does'nt match");
    }
    const userExist = await Admin.findOne({ email });
    if (userExist) {
      return res.send("User already registered");
    }
    const user = new Admin({
      name,
      course,
      branch,
      email,
      password,
      cpassword,
    });
    const registered = await user.save();
    if (registered) {
      //jwt thing
      const token = await registered.jwtGenerateToken();
      res.status(200).json({ success: "registration successful" });
    } else {
      return res.status(201).json({ success: "Some Unknown Error" });
    }
  } catch (err) {
    console.log(err);
  }
};

const Alogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ success: false });
    }
    const userExist = await Admin.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ success: false });
    }
    const passMatch = userExist.comparePassword(password);
    if (!passMatch) {
      return res.status(401).json({ success: false });
    } else {
      //jwt thing

      //  const token = await userExist.jwtGenerateToken(); //session
      generateToken(userExist, 200, res);
    }
  } catch (err) {
    console.log(err);
  }
};

const Usignup = async (req, res) => {
  const { name, phone, email, password, cpassword } = req.body;

  try {
    if (!(name || phone || email || password || cpassword)) {
      return res.status(422).json({ success: false });
    }
    if (password != cpassword) {
      return res.status(422).json({ success: false });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ success: false });
    }
    const user  = new User({
      name,
      course,
      branch,
      email,
      password,
      cpassword,
    });
    const registered = await user.save();
    if (registered) {
      //jwt thing
      const token = await registered.jwtGenerateToken();
      res.status(200).json({ success: "registration successful" });
    } else {
      return res.status(201).json({ success: "Some Unknown Error" });
    }
  } catch (err) {
    console.log(err);
  }
};

const Ulogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ success: false });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ success: false });
    }
    const passMatch = userExist.password === password;
    if (!passMatch) {
      return res.status(401).json({ success: false });
    } else {
      //jwt thing
      generateToken(userExist, 200, res);
      console.log("successful login");
    }
  } catch (err) {
    console.log(err);
  }
};

//httppnly cookie with jwt
const generateToken = async (userExist, statuscode, res) => {
  const token = await userExist.jwtGenerateToken();
  const options = {
    httpOnly: true,
    expiresIn: new Date(Date.now() + process.env.EXPIRES_TOKEN),
  };

  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: "login successful" });
};

//logout
const Logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

//User Profile
// const userProfile = async (req,res,next)=>{
//   const user = Admin.findById(req.user._id)
//   res.status(200).json({
//     success:true,
//   user  })
//   next();
// }

exports.Asignup = Asignup;
exports.Alogin = Alogin;
exports.Usignup = Usignup;
exports.Ulogin = Ulogin;

exports.Logout = Logout;
