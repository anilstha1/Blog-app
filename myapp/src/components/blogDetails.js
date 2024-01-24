import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/blogs/get/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);
  return (
    <div className="container">
      <div className="">
        <img
          src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
          alt="blog"
          className="object-fit-cover img-fluid w-100 border rounded"
          style={{height: "300px"}}
        />
      </div>
      <div className="">
        <h2 className="m-0">{blog?.title}</h2>
        <div className="fs-6 fw-bold">{blog?.user?.name}</div>
        <div>{blog?.description}</div>
      </div>
    </div>
  );
}
