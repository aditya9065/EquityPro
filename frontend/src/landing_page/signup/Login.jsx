import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            "http://localhost:8080/login",
            {
              ...inputValue,
            },
            { withCredentials: true }
          );
          console.log(data);
          const { success, message, username } = data;
          if (success) {
            handleSuccess(message);
            setTimeout(() => {
              console.log(username)
            //   navigate("/");
            const encodedUsername = encodeURIComponent(username);
            window.location.href =  `http://localhost:5174?username=${encodedUsername}`;
            }, 1000);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
        }
        setInputValue({
          ...inputValue,
          email: "",
          password: "",
        });
      };

  return (
    <div className="container p-5 m-5 ">
      <form className="row g-4 border rounded-5 form py-3" onSubmit={handleSubmit}>
        <div className="col-8 offset-2">
          <label htmlFor="staticEmail2" className="">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail2"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-8 offset-2">
          <label htmlFor="inputPassword2" className="">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword2"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-3 offset-5">
          <button type="submit" className="btn btn-primary my-3">
            Log in
          </button>
        </div>
      <p className="text-center mb-4">Not have an account ? <Link to="/signup">Sign up</Link></p>
      <ToastContainer/>
      </form>
    </div>
  );
}

export default Login;
