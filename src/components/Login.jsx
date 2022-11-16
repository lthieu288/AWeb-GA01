import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Login() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().min(4).max(20).required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  function getUserLocal() {
    setUser(localStorage.getItem("User"));
  }
  useEffect(() => {
    getUserLocal();
  }, [user]);

  const loginPage = (data) => {
    const userLogin = JSON.parse(user);
    if (
      data.email === userLogin.email &&
      data.password === userLogin.password
    ) {
      navigate("/home");
    } else {
      MySwal.fire({
        title: <strong>You login fail!</strong>,
        html: <i>you have entered the wrong password or username</i>,
        icon: "error"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(loginPage)}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          {...register("email")}
        />
        <p className="error">{errors.email?.message}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Do not have account?{" "}
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
}
export default Login;
