import React from "react";
import {Link} from "react-router-dom";

function Blog({blog}) {
  return (
    <>
      <div className="container mt-3 p-3">
        <Link
          to={`/blog/${blog._id}`}
          className="text-decoration-none text-black"
        >
          <div className="row">
            <div className="col-12 col-md-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="object-fit-cover img-fluid w-100 border rounded"
                style={{maxHeight: "300px"}}
              />
            </div>
            <div className="col-12 col-md-8">
              <h2 className="m-0 fs-1 fw-bold">{blog.title}</h2>
              <div className="fs-6 fw-bold">{blog.user.name}</div>
              <div className="">{blog.description}</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Blog;
