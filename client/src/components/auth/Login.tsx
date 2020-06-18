import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { login, cleanAuthErrorsState } from "../../context/actions/AuthAction";
import { NavLink, Redirect } from "react-router-dom";
import { MARKET_LANDING, SIGN_UP } from "../../path";

// Components
import { LinearProgress } from "@material-ui/core";
const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, errors } = useSelector(
    (state: RootState) => state.auth
  );
  const [content, setContent] = useState({ email: "", password: "" });

  const handleChangeContent = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(login(content));
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
    <div>
      {isLoading && <LinearProgress />}

      <div className="py-12 w-full max-w-xs mx-auto relative">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                errors.includes("USER_NOT_FOUND") && "border-red-300 bg-red-100"
              }`}
              id="email"
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleChangeContent}
              value={content.email}
            />
            {/* Errors */}
            {errors.includes("USER_NOT_FOUND") && (
              <p className="text-red-500 text-sm italic ">Email is not valid</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                errors.includes("PASSWORD_INVALID") &&
                "border-red-300 bg-red-100"
              }`}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeContent}
              value={content.password}
            />
            {/* Errors */}
            {errors.includes("PASSWORD_INVALID") && (
              <p className="text-red-500 text-sm italic ">
                Password is not valid
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </button>

            <NavLink exact to={SIGN_UP} className="">
              <button className="no-underline">No Account?</button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
