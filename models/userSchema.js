const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "please enter name"] },

  course: { type: String, required: true },

  branch: { type: String, required: true },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must have eight(8) characters long"],
  },

  cpassword: { type: String, required: true },

  role: {
    type: String,
    default: "User",
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//encryption of password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//verify password

userSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};


userSchema.methods.jwtGenerateToken = async function (res) {
    try {
      const token = jwt.sign(
        {
          _id: this._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );
      this.tokens = this.tokens.concat({ token: token });
      await this.save();
      return token;
  
    } catch (err) {
      console.log(err);
    }
  };

  const user = new mongoose.model("userAuth", userSchema);
  module.exports = user;