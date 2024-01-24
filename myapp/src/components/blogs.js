import React, {useEffect, useState} from "react";
import axios from "axios";
function Blogs() {
  const [id, setid] = useState();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("authToken");
  const [editblog, seteditblog] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/blogs/get", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setBlogs(data.data.blogs);
      });
  }, []);

  const editpost = (blog) => {
    setTitle(blog.title);
    setDescription(blog.description);
    seteditblog(true);
    setid(blog._id);
  };
  const removepost = (blog) => {
    axios
      .delete(`http://localhost:3001/users/blogs/${blog._id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("blog deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addblog = (e) => {
    axios
      .put(
        `http://localhost:3001/users/blogs/${id}`,
        {title, description},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("blog added");
        setTitle("");
        setDescription("");
        seteditblog(false);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  return (
    <>
      <div>
        {blogs.map((blog) => {
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
                    <h2>{blog.title}</h2>
                    <div>{blog.description}</div>
                    <button
                      className="btn btn-primary my-3"
                      onClick={() => editpost(blog)}
                    >
                      edit
                    </button>
                    <button
                      className="btn btn-primary m-3"
                      onClick={() => removepost(blog)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {editblog && (
          <div>
            <div>
              <form>
                <label className="form-label">title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label className="form-label">description</label>
                <textarea
                  className="form-control"
                  rows={6}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <button className="btn btn-primary my-3" onClick={addblog}>
                  add blog
                </button>
              </form>
            </div>
            ;
          </div>
        )}
      </div>
    </>
  );
}

export default Blogs;
