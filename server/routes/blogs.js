const express = require("express");
const user = require("../models/user.js");
const blog = require("../models/blog.js");
const blogs = express.Router();
const verifyUser = require("../authenticate.js");

//get blog
blogs.get("/get/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const blogdata = await blog.findById(id).populate("user", {name: 1});
    console.log(blogdata);
    res.status(200).json(blogdata);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
});
// get blogs
blogs.get("/getblogs", async (req, res) => {
  try {
    blogdata = await blog.find().populate("user", {name: 1});
    console.log(blogdata);
    res.json(blogdata);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
});

// get blogs
blogs.get("/get", verifyUser, async (req, res) => {
  try {
    blogdata = await user
      .findById(req.user)
      .populate("blogs", {title: 1, description: 1});
    console.log(blogdata);
    res.json(blogdata);
  } catch (err) {
    res.status(401).json({message: "not authorized"});
  }
});

// add blogs
blogs.post("/add", verifyUser, async (req, res) => {
  console.log(req.body);
  const {title, description, imageUrl} = req.body;
  try {
    const blogData = new blog({
      user: req.user,
      title,
      description,
      image: imageUrl,
    });
    await blogData.save();
    const userdata = await user.findById(req.user);
    userdata.blogs.push(blogData._id);
    await userdata.save();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

blogs.put("/:id", verifyUser, async (req, res) => {
  try {
    console.log("hello");
    const blogData = await blog.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(blogData);
  } catch (err) {
    res.json({message: "something went wrong"});
  }
});

blogs.delete("/:id", verifyUser, async (req, res) => {
  try {
    console.log("hello");
    await blog.findOneAndDelete(req.params.id);
    var userdata = await user.findById(req.user);
    var index = userdata.blogs.indexOf(req.params.id);
    userdata.blogs.splice(index, 1);
    userdata.save();
    res.json({message: "deleted"});
  } catch (err) {
    res.json({message: "something went wrong"});
  }
});
module.exports = blogs;
