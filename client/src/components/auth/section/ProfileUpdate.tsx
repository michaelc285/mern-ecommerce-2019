import React, { useState, useCallback } from "react";
import {
  userUpdateByUser,
  cleanUpdateUserState,
} from "../../../context/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import { IUserUpdateBody } from "../../../types/interfaces";

// Components
import { Button, CircularProgress } from "@material-ui/core";

const ProfileUpdate = ({ data }: any) => {
  const dispatch = useDispatch();
  const { isLoading, errors } = useSelector(
    (state: RootState) => state.userUpdate
  );

  const [content, setContent] = useState({
    name: data.name,
    email: data.email,
    password: "",
  });

  // HandleChange
  const handleChangeTextContent = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;
    setContent({ ...content, [name]: value });
  };

  const handleReset = useCallback(() => {
    setContent({
      name: data.name,
      email: data.email,
      password: "",
    });
    dispatch(cleanUpdateUserState());
  }, [setContent, dispatch, data.email, data.name]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: IUserUpdateBody = {};
    if (content.name !== data.name) {
      body["name"] = content.name;
    }

    if (content.email.length > 0 && content.email !== data.email) {
      body["email"] = content.email;
    }

    if (content.password) {
      body["password"] = content.password;
    }

    dispatch(userUpdateByUser(body));
  };

  return (
    <div className="relative">
      {/* Loading Spinner*/}
      {isLoading && (
        <div className="h-full w-full z-10 absolute flex justify-center items-center bg-white opacity-75">
          <CircularProgress color="primary" />
        </div>
      )}
      {/* Loading Spinner */}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="p-1 mb-3">
          <label
            htmlFor="name_input"
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name_input"
            className={` focus:outline-none focus:shadow-outline border-2 ${
              errors.includes("NAME_FORMAT")
                ? "border-red-500 bg-red-100"
                : "border-gray-300 bg-white"
            } rounded-lg py-2 px-4 block w-full sm:w-8/12 md:w-6/12 appearance-none leading-normal`}
            type="text"
            name="name"
            value={content.name}
            onChange={handleChangeTextContent}
          />
          {errors.includes("NAME_FORMAT") && (
            <p className="text-sm text-red-500 py-1">
              Name's length should be within 1 - 50
            </p>
          )}
        </div>
        {/* Name End */}
        {/* Email */}
        <div className="p-1 mb-3">
          <label
            htmlFor="email_input"
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email_input"
            className={` focus:outline-none focus:shadow-outline border-2 ${
              errors.includes("EMAIL_EXIST")
                ? "border-red-500 bg-red-100"
                : "border-gray-300 bg-white"
            } rounded-lg py-2 px-4 block w-full sm:w-10/12 md:w-8/12 appearance-none leading-normal`}
            type="email"
            name="email"
            value={content.email}
            onChange={handleChangeTextContent}
          />
          {errors.includes("EMAIL_EXIST") && (
            <p className="text-sm text-red-500 py-1">
              An email already exisits
            </p>
          )}
        </div>
        {/* Email End */}
        {/* Password */}
        <div className="p-1 mb-3">
          <label
            htmlFor="password_input"
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password_input"
            className={` focus:outline-none focus:shadow-outline border-2 ${
              errors.includes("PASSWORD_FORMAT")
                ? "border-red-500 bg-red-100"
                : "border-gray-300 bg-white"
            } rounded-lg py-2 px-4 block w-full sm:w-8/12 md:w-6/12 appearance-none leading-normal`}
            type="password"
            name="password"
            value={content.password}
            onChange={handleChangeTextContent}
          />
          {errors.includes("PASSWORD_FORMAT") && (
            <p className="text-sm text-red-500 py-1">
              Password's length should be within 4 - 16
            </p>
          )}
        </div>
        {/* Password End */}

        {/* Submit Button */}
        <div className="p-1 mb-3 flex">
          <Button
            aria-label="submit_button"
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              content.name === data.name &&
              content.email === data.email &&
              content.password.length === 0
                ? true
                : false
            }
          >
            Update Profile
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
  );
};

export default ProfileUpdate;
