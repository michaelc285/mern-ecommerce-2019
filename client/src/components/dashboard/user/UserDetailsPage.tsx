import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { IUserDetailsPage } from "../../../types/interfaces";
import { RootState } from "../../../context/store";
import { USER_CONTROL_PANEL } from "../../../path";
import {
  getUserById,
  deleteUser,
  clearDeleteUserState,
} from "../../../context/actions/AuthAction";

// Components
import {
  Button,
  LinearProgress,
  Breadcrumbs,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import History from "./section/History";

const UserDetailsPage = ({ match }: IUserDetailsPage) => {
  const userID = match.params.userID;
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.userDetails
  );
  const deleteState = useSelector((state: RootState) => state.userDelete);
  const [isReadOnly, setIsReadOnly] = useState({ name: true });
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(name);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Submitted");
  };

  useEffect(() => {
    if (deleteState.success === false) {
      dispatch(getUserById(userID));
    }

    return () => {
      if (deleteState.success) {
        dispatch(clearDeleteUserState());
      }
    };
  }, [dispatch, userID, deleteState.success]);

  if (deleteState.success === true) {
    return <Redirect to={{ pathname: USER_CONTROL_PANEL }} />;
  }

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  //Components
  const NoHistory = (
    <div className="h-32">
      <div className="h-full flex justify-center items-center text-gray-700 text-lg font-mono">
        <p>No History</p>
      </div>
    </div>
  );

  // Id
  // name
  // Role
  // Reg date
  // Email
  // Cart
  // History
  // Submit Button
  // Delete User
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="mt-16">
          <div className="mb-6">
            <Breadcrumbs aria-label="breadcrumb">
              <NavLink
                exact
                to={USER_CONTROL_PANEL}
                style={{ textDecoration: "none" }}
              >
                User Control Panel
              </NavLink>
              <Typography color="textPrimary">
                {`${data._id} - ${data.name}`}
              </Typography>
            </Breadcrumbs>
          </div>
          {/* Profile Update */}
          <div className="mb-6">
            <h4 className="font-semibold">Profile</h4>
            <hr />
            <form onSubmit={handleSubmit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Update Profile
              </Button>
            </form>
          </div>
          {/* Profile Update End */}
          {/* History */}
          <div className="mb-6">
            <h4 className="font-semibold">History</h4>
            <hr />

            <History data={data.history} />
          </div>
          {/* History End */}
          {/* Delete Account */}
          <div className="mb-6">
            <h4 className="font-semibold text-red-600">Delete Account</h4>
            <hr />
            <div>
              <p className="mb-3">
                Once you delete account, there is no going back. Please be
                certain.
              </p>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => dispatch(deleteUser(userID))}
              >
                Delete Account
              </Button>
            </div>
          </div>
          {/* Delete End */}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
