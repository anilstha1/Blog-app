import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup() {
  var [name, setName] = useState("");
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [cpassword, setcpassword] = useState("");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

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
          navigate("/");
        })
        .catch((err) => {
          return;
        });
    }
  }, []);

  var adduser = () => {
    if (name && username && password) {
      if (password === cpassword) {
        axios
          .post("http://localhost:3001/users/add", {name, username, password})
          .then((res) => {
            alert("user registered");
            navigate("/login");
          });
      } else {
        alert("please enter same password and confirm password");
      }
    } else {
      alert("please fill all the fields");
    }
  };
  return (
    <>
      <div className="container my-5 py-5 d-flex  justify-content-center">
        <form
          className="border p-3 rounded d-flex flex-column gap-3"
          style={{width: "400px"}}
        >
          <h1 className="text-center">Sign Up</h1>
          <div className="form-outline">
            <label className="form-label">name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-outline">
            <label className="form-label">username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-outline">
            <label className="form-label">password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-outline">
            <label className="form-label">confirm password</label>
            <input
              type="password"
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-primary my-3"
            onClick={() => {
              adduser();
            }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
