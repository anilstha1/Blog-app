const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users.js");
const blogs = require("./routes/blogs.js");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/students");
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.listen(3001);

app.use("/users", users);
app.use("/users/blogs", blogs);
