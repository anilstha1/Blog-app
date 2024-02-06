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
    <div className="box p-3 d-flex justify-content-center">
      <div className="post">
        <div className="">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="image object-fit-cover w-100 border rounded"
            style={{height: "300px"}}
          />
        </div>
        <div className="">
          <h2 className="m-0">{blog?.title}</h2>
          <div className="fs-6 fw-bold">{blog?.user?.name}</div>
          <div>{blog?.description}</div>
        </div>
      </div>
    </div>
  );
}
