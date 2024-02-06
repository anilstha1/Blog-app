import axios from "axios";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {authActions} from "./index";
import {AiOutlineMenu} from "react-icons/ai";
const Navbar = () => {
  const dispatch = useDispatch();
  const isloggedin = useSelector((state) => state.isloggedin);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/users/isauthenticated", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("hello");
          dispatch(authActions.login());
        })
        .catch((err) => {
          return;
        });
    }
  }, []);
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("authToken");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand fw-bolder fs-2" href="">
            Navbar
          </Link>

          <ul className="navbar-nav  mb-2 mb-lg-0 d-flex">
            <li className="nav-item">
              <Link className="nav-link me-auto" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {isloggedin && (
              <div className="d-flex">
                <li>
                  <Link className="nav-link ms-auto" to="/blogs">
                    blogs
                  </Link>
                </li>
                <li>
                  <Link className="nav-link ms-auto" to="/addblogs">
                    addblogs
                  </Link>
                </li>
              </div>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {isloggedin ? (
              <button
                className="btn btn-outline-primary ms-3 rounded-pill"
                onClick={logout}
              >
                logout
              </button>
            ) : (
              <div>
                <Link className="btn btn-primary rounded-pill" to="/login">
                  login
                </Link>
                <Link
                  className="btn btn-outline-primary ms-3 rounded-pill"
                  to="/register"
                >
                  register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
