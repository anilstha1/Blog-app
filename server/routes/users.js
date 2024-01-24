const express = require("express");
const user = require("../models/user.js");
const users = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("../authenticate.js");

// get user
users.get("/get", verifyUser, async (req, res) => {
  try {
    userdata = await user.findById(res.user).select("-password");
    console.log(userdata);
    res.json(userdata);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
});

function generateToken(id) {
  return jwt.sign({id}, "jkkkdkdkdjf", {expiresIn: "30d"});
}

users.post("/login", async (req, res) => {
  const {username, password} = req.body;
  try {
    var userData = await user.findOne({username});
    if (userData) {
      var isPasswordCorrect = await bcrypt.compare(password, userData.password);
      if (isPasswordCorrect) {
        const token = generateToken(userData._id);
        return res.status(200).json({
          name: userData.name,
          username: userData.username,
          token,
        });
      }
      throw new Error("User is not authorized");
    } else {
      throw new Error("User is not authorized");
    }
  } catch (err) {
    res.status(400).json({message: "Username or Password wrong"});
  }
});

// add user
users.post("/add", async (req, res) => {
  const {name, email, username, password} = req.body;
  const newpassword = await bcrypt.genSaltSync(10);
  console.log(req.body);
  const user_exists = await user.findOne({username});
  if (user_exists) {
    return res.status(400).json({message: "user already exists"});
  }
  const npassword = await bcrypt.hashSync(password, newpassword);
  try {
    const userData = new user({
      name,
      email,
      username,
      password: npassword,
    });
    await userData.save();
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

users.put("/:id", verifyUser, async (req, res) => {
  try {
    const userData = await user.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(userData);
  } catch (err) {
    res.json({message: "something went wrong"});
  }
});

users.delete("/:id", verifyUser, async (req, res) => {
  try {
    await user.findOneAndDelete(req.params.id);
    res.json({message: "deleted"});
  } catch (err) {
    res.json({message: "something went wrong"});
  }
});
//authenticate user
users.get("/isauthenticated", verifyUser, (req, res) => {
  return res.status(200).json({message: "authenticated"});
});

module.exports = users;
