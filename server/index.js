const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users.js");
const blogs = require("./routes/blogs.js");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.listen(3001);

app.use("/users", users);
app.use("/users/blogs", blogs);
