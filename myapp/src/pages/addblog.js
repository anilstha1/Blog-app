import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function AddBlogs() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/isauthenticated", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        return;
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);
  const addblog = (e) => {
    axios
      .post(
        "http://localhost:3001/users/blogs/add",
        {title, description, imageUrl},
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
        setImageUrl("");
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  return (
    <>
      <div className="container my-5 py-5">
        <div>
          <form>
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label className="form-label">Image</label>
            <input
              type="text"
              className="form-control"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
            <label className="form-label">Description</label>
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
      </div>
    </>
  );
}

export default AddBlogs;
