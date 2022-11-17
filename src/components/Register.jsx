import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Register() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name or Email is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().min(4).max(20).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    localStorage.setItem("User", JSON.stringify(data));
    navigate("/login");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Register</h3>
      <div className="mb-3">
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          {...register("firstName")}
        />
        <p className="error">{errors.firstName?.message}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          {...register("lastName")}
        />
        <p className="error">{errors.lastName?.message}</p>
      </div>
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
      <div className="mb-3">
        <label htmlFor="repeatPassword">Repeat your password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          {...register("repeatPassword")}
        />
        <p className="error">{errors.repeatPassword?.message}</p>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        <Link className="nav-link" to="/login">
          Already registered, sign in?
        </Link>
      </p>
    </form>
  );
}
