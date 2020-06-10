import React, { useState, useEffect } from "react";
import { userUpdateByAdmin } from "../../../../context/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { IUserUpdateBody } from "../../../../types/interfaces";
// Components
import { Button, Switch, FormControlLabel } from "@material-ui/core";

const ProfileUpdate = ({ data, userId }: any) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    name: data.name,
    email: data.email,
    password: "",
    role: data.role ? true : false,
  });

  // Handle
  const handleChangeTextContent = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;
    setContent({ ...content, [name]: value });
    if (name === "role") {
      setContent({ ...content, [name]: !content.role });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: IUserUpdateBody = {
      name: content.name,
      email: content.email,
      role: content.role === true ? 1 : 0,
    };

    if (content.password) {
      body["password"] = content.password;
    }

    dispatch(userUpdateByAdmin(userId, body));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <h6>Name</h6>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 placeholder-current rounded-lg py-2 px-4 block w-full sm:w-4/12 appearance-none leading-normal"
            type="text"
            name="name"
            value={content.name}
            onChange={handleChangeTextContent}
            // placeholder={data.name}
          />
        </div>
        {/* Name End */}
        {/* Email */}
        <div className="mb-3">
          <h6>Email</h6>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 placeholder-current rounded-lg py-2 px-4 block w-full sm:w-6/12 appearance-none leading-normal"
            type="email"
            name="email"
            value={content.email}
            onChange={handleChangeTextContent}
            // placeholder={data.email}
          />
        </div>
        {/* Email End */}
        {/* Password */}
        <div className="mb-3">
          <h6>Password</h6>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 placeholder-current rounded-lg py-2 px-4 block w-full sm:w-4/12 appearance-none leading-normal"
            type="password"
            name="password"
            value={content.password}
            onChange={handleChangeTextContent}
          />
        </div>
        {/* Password End */}
        {/* Role */}
        <div className="mb-3">
          <h6>Role</h6>
          <FormControlLabel
            control={
              <Switch
                checked={content.role}
                onChange={handleChangeTextContent}
                name="role"
              />
            }
            label={content.role ? "Admin" : "User"}
          />
        </div>
        {/* Role End */}
        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
