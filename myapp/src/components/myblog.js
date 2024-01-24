import React, {useEffect, useState} from "react";
import axios from "axios";
function Blogs() {
  const [myblogs, setmyBlogs] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/blogs/get", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setmyBlogs(data.data);
        console.log(myblogs);
      });
  }, [myblogs]);
  return (
    <>
      <div>
        {myblogs.map((blog) => {
          return (
            <div>
              <div className="container mt-3">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                      className="image"
                    />
                  </div>
                  <div className="col-md-8 fs-5">
                    <h2>{blog.blogs.title}</h2>
                    <div className="fs-6 pb-3">{blog.name}</div>
                    <div>{blog.blogs.description}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Blogs;
