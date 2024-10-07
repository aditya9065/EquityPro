import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


function Signup() {

    const navigate = useNavigate();

    const[inputValue, setInputValue] = useState({
        email:"",
        username:"",
        password:"",
    })

    const {email, username, password} = inputValue;

    let handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    };

    const handleError = (err) => {
        toast.error(err, {
          position: "bottom-left",
        });
    };
    const handleSuccess = (msg) => {
        toast.success(msg, {
          position: "bottom-right",
        });
    };

    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
              "https://backend-service-equitypro.onrender.com/signup",
              {
                ...inputValue,
              },
              { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                console.log("success")
              handleSuccess(message);
              setTimeout(() => {
                const encodedUsername = encodeURIComponent(username);
                window.location.href =  `https://equity-pro-dashboard-kn1difrvo.vercel.app?username=${encodedUsername}`;
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
            username: "",
          });
    }
  return (
    <div className="container p-5 m-5">
      <form className="row g-4 border rounded-5 form py-3" onSubmit={handleSubmit}>
        <div className="col-8 offset-2">
          <label htmlFor="staticEmail2" className="">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="staticEmail2"
            placeholder="Enter Email"
            value={email}
            name="email" 
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-8 offset-2">
          <label htmlFor="inputusername" className="">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="inputusername"
            placeholder="Create Username"
            value={username}
            name="username"
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
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-3 offset-5">
          <button type="submit" className="btn btn-primary my-3">
            Sign Up
          </button>
        </div>
      <p className="text-center mb-4">All ready have an account ? <Link to="/login">Log in.</Link></p>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Signup;
