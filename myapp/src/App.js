import React from "react";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";

import Login from "./components/login";
import Signup from "./components/signup";

import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/home";
import Blogs from "./components/blogs";
import AddBlogs from "./components/addblog";
import BlogDetails from "./components/blogDetails";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/addblogs" element={<AddBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
