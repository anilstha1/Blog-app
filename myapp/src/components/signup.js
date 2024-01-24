import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  var [name, setName] = useState("");
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [cpassword, setcpassword] = useState("");
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
          navigate("/");
        })
        .catch((err) => {
          return;
        });
    }
  }, []);
  var adduser = () => {
    axios
      .post("http://localhost:3001/users/add", {name, username, password})
      .then((res) => {
        alert("user registered");
        navigate("/login");
      });
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="w-25">
          <form>
            <div className="mt-3">
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

            <label className="form-label">username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <label className="form-label">password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <label className="form-label">conform password</label>
            <input
              type="password"
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button
              className="btn btn-primary my-3"
              onClick={() => {
                adduser();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
