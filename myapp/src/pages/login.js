import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../components/index";
function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
  var getuser = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:3001/users/login",
        {username, password},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("user registered");
        dispatch(authActions.login());
        localStorage.setItem("authToken", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        alert("username or password wrong");
      });
  };

  return (
    <>
      <div className="container my-5 py-5 d-flex justify-content-center">
        <form
          className="border p-3 rounded d-flex flex-column gap-3"
          style={{width: "400px"}}
        >
          <h1 className="text-center">Sign In</h1>
          <div className="form-outline">
            <label className="form-label">Username</label>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="w-100 btn btn-primary my-3" onClick={getuser}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
