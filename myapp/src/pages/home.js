import React, {useEffect, useState} from "react";
import axios from "axios";
import Blog from "../components/blog";

function Home() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/users/blogs/getblogs").then((data) => {
      setBlogs(data.data);
    });
  }, []);
  return (
    <>
      <div>
        {blogs.map((blog) => {
          return <Blog blog={blog} key={blog._id} />;
        })}
      </div>
    </>
  );
}

export default Home;
