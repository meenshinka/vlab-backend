const express = require("express");
const app = express();
app.use(express.json());
const body_parser = require("body-parser");

// const Suser = require("../models/adminSchema.js");
const router = express.Router();
router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

const Home = require("../controllers/Home");
const {
  Asignup,
  Alogin,
  Usignup,
  Ulogin,
  Logout,
} = require("../controllers/Credentials");
const { Authenticate } = require("../middleware/auth.js");

router.get("/", Home);

router.post("/asignup", Asignup);

router.post("/alogin", Alogin);
router.post("/usignup", Usignup);
router.post("/ulogin", Ulogin);

router.post("/logout", Logout);

module.exports = router;
