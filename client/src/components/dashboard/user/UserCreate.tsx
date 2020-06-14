import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import {
  createUserByAdmin,
  cleanCreateUserState,
} from "../../../context/actions/AuthAction";
import { NavLink } from "react-router-dom";
import { IUserCreateBody } from "../../../types/interfaces";
import { USER_CONTROL_PANEL } from "../../../path";
//Components
import {
  Typography,
  Breadcrumbs,
  FormControlLabel,
  Switch,
  Button,
  CircularProgress,
} from "@material-ui/core";

const UserCreate = () => {
  const dispatch = useDispatch();
  const { isLoading, success, errors } = useSelector(
    (state: RootState) => state.userCreateByAdmin
  );
  const [successPageIsOpen, setSuccessPageIsOpen] = useState(false);
  const [content, setContent] = useState({
    name: "",
    password: "",
    email: "",
    role: false,
  });

  // Handler
  const handleChangeContent = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setContent({ ...content, [name]: value });
    if (name === "role") {
      setContent({ ...content, [name]: !content.role });
    }
  };

  const handleReset = useCallback(() => {
    setContent({ name: "", password: "", email: "", role: false });
    dispatch(cleanCreateUserState());
  }, [dispatch, setContent]);

  const handleSuccessPageClose = useCallback(() => {
    setSuccessPageIsOpen(false);
  }, [setSuccessPageIsOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: IUserCreateBody = {
      name: content.name,
      email: content.email,
      password: content.password,
      role: content.role ? 1 : 0,
    };
    dispatch(createUserByAdmin(body));
  };

  useEffect(() => {
    if (success) {
      handleReset();
      setSuccessPageIsOpen(true);
    }

    return () => {
      dispatch(cleanCreateUserState());
    };
  }, [dispatch, success, handleReset]);

  // Components

  const LoadingComponent = (
    <div className="h-full w-full z-10 absolute flex justify-center items-center bg-white opacity-75">
      <CircularProgress color="primary" />
    </div>
  );

  const SuccessPage = (
    <div className="h-full w-full z-10 absolute flex flex-col justify-center items-center bg-white">
      <h6 className="text-4xl font-mono font-semibold text-green-600 uppercase mb-5">
        Success
      </h6>
      <div className="flex flex-col md:flex-row">
        <button
          onClick={handleSuccessPageClose}
          className="rounded text-white p-2 bg-blue-500 hover:bg-blue-600 mb-3 md:mr-3 uppercase"
        >
          Create Another User
        </button>
        <NavLink exact to={USER_CONTROL_PANEL}>
          <button className="rounded no-underline text-white  hover:text-white p-2 bg-blue-500 hover:bg-blue-600 uppercase">
            Back to user control
          </button>
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="h-screen">
      <div className="container mx-auto">
        <div className="py-12">
          <div className="mb-6">
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink
                exact
                to={USER_CONTROL_PANEL}
                className="text-black"
                style={{ textDecoration: "none" }}
              >
                User Control Panel
              </NavLink>
              <Typography color="textPrimary">Create Account</Typography>
            </Breadcrumbs>
          </div>

          <h6 className="mb-3 font-semibold">Create Account</h6>
          <hr />
          <div className="relative">
            {/* Loading Spinner*/}
            {isLoading && LoadingComponent}
            {/* When Success */}
            {successPageIsOpen && SuccessPage}

            <form className="py-3" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                {/* Name Field */}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Name
                  </label>
                  <input
                    className={`appearance-none block w-full text-gray-700 border-2 ${
                      errors.includes("NAME_FORMAT")
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
                    id="grid-first-name"
                    type="text"
                    name="name"
                    value={content.name}
                    onChange={handleChangeContent}
                    required
                  />
                  {/* Error Message */}
                  {errors.includes("NAME_FORMAT") && (
                    <p className="text-red-500 text-xs italic">
                      Name's length should be within 1-50
                    </p>
                  )}
                </div>
                {/* Name Field end */}
                {/* Password field */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className={`appearance-none block w-full text-gray-700 border-2 ${
                      errors.includes("PASSWORD_FORMAT")
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
                    id="grid-password"
                    type="password"
                    name="password"
                    value={content.password}
                    onChange={handleChangeContent}
                    required
                  />
                  {/* Error Message */}
                  {errors.includes("PASSWORD_FORMAT") && (
                    <p className="text-red-500 text-xs italic">
                      Password's length should be within 4-16
                    </p>
                  )}
                </div>
                {/* Password field end */}
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                {/* Email field */}
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className={`appearance-none block w-full text-gray-700 border-2 ${
                      errors.includes("EMAIL_EXIST")
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
                    id="grid-email"
                    type="email"
                    name="email"
                    value={content.email}
                    onChange={handleChangeContent}
                    required
                  />
                  {/* Error Message */}
                  {errors.includes("EMAIL_EXIST") && (
                    <p className="text-red-500 text-xs italic">
                      Email Address is Already Registered
                    </p>
                  )}
                </div>
                {/* Email Field end */}
              </div>
              {/* Role */}
              <div className="p-1 mb-3">
                <label
                  htmlFor="switch_group"
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <FormControlLabel
                  id="switch_group"
                  control={
                    <Switch
                      checked={content.role}
                      onChange={handleChangeContent}
                      name="role"
                      aria-label="role_switch"
                    />
                  }
                  label={content.role ? "Admin" : "User"}
                />
              </div>
              {/* Role End */}
              {/* Submit Button */}
              <div className="p-1 mb-3 flex">
                <Button
                  aria-label="submit_button"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    !content.name || !content.email.length || !content.password
                      ? true
                      : false
                  }
                >
                  Create Account
                </Button>

                <Button
                  aria-label="reset_button"
                  className="ml-3"
                  variant="contained"
                  color="primary"
                  onClick={handleReset}
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
