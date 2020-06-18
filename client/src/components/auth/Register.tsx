import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import {
  register,
  cleanAuthErrorsState,
} from "../../context/actions/AuthAction";
import { NavLink, Redirect } from "react-router-dom";
import { SIGN_IN, MARKET_LANDING } from "../../path";
import { LinearProgress } from "@material-ui/core";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, errors } = useSelector(
    (state: RootState) => state.auth
  );
  const [content, setContent] = useState({ name: "", email: "", password: "" });

  //  Handle form
  const handleChangeContent = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(register(content));
  };

  useEffect(() => {
    dispatch(cleanAuthErrorsState());
    return () => {
      dispatch(cleanAuthErrorsState());
    };
  }, [dispatch]);

  // if authenticated redirect to market landing page
  if (isAuthenticated === true) {
    return <Redirect to={{ pathname: MARKET_LANDING }} />;
  }

  return (
    <div className="">
      {isLoading && <LinearProgress />}
      <div className="py-12 w-full max-w-xs mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                errors.includes("NAME_FORMAT") ||
                (errors.includes("NAME_MISSING")
                  ? "border-red-300 bg-red-100"
                  : null)
              }`}
              id="email"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChangeContent}
              value={content.name}
            />
            {/* Errors */}
            {errors.includes("NAME_FORMAT") && (
              <p className="text-red-500 text-sm italic">
                Name's length should within 1-50
              </p>
            )}
            {errors.includes("NAME_MISSING") && (
              <p className="text-red-500 text-sm italic">Please enter name</p>
            )}
          </div>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                errors.includes("EMAIL_EXIST") ||
                errors.includes("EMAIL_MISSING")
                  ? "border-red-300 bg-red-100"
                  : null
              }`}
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChangeContent}
              value={content.email}
            />
            {/* Errors */}
            {errors.includes("EMAIL_EXIST") && (
              <p className="text-red-500 text-sm italic">
                Email exists. Please try another.
              </p>
            )}
            {errors.includes("EMAIL_MISSING") && (
              <p className="text-red-500 text-sm italic">Please enter email</p>
            )}
          </div>
          {/* Passowrd */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                errors.includes("PASSWORD_FORMAT") ||
                errors.includes("PASSWORD_MISSING")
                  ? "border-red-300 bg-red-100"
                  : null
              }`}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeContent}
              value={content.password}
            />
            {/* Errors */}
            {errors.includes("PASSWORD_FORMAT") && (
              <p className="text-red-500 text-sm italic">
                Password length should be within 4-16
              </p>
            )}
            {errors.includes("PASSWORD_MISSING") && (
              <p className="text-red-500 text-sm italic">
                Please enter password
              </p>
            )}
          </div>
          {/* Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              Sign Up
            </button>
            <NavLink exact to={SIGN_IN}>
              <button className="no-underline">Sign In</button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
