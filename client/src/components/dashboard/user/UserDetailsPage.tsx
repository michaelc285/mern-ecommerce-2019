import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { IUserDetailsPage } from "../../../types/interfaces";
import { RootState } from "../../../context/store";
import { USER_CONTROL_PANEL } from "../../../path";
import {
  getUserById,
  deleteUser,
  cleanDeleteUserState,
  cleanUpdateUserState,
  cleanUserDetailsState,
} from "../../../context/actions/AuthAction";

// Components
import {
  Button,
  LinearProgress,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import History from "./section/History";
import ProfileUpdate from "./section/ProfileUpdate";

const UserDetailsPage = ({ match }: IUserDetailsPage) => {
  const userID = match.params.userID;
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state: RootState) => state.userDetails
  );
  const deleteState = useSelector((state: RootState) => state.userDelete);

  useEffect(() => {
    // DeleteState success default false, if delete is false fetch user data.
    if (deleteState.success === false) {
      dispatch(getUserById(userID));
    }

    // When Unmount
    return () => {
      if (deleteState.success) {
        dispatch(cleanDeleteUserState());
        dispatch(cleanUserDetailsState());
      }
      dispatch(cleanUpdateUserState());
    };
  }, [dispatch, userID, deleteState.success]);

  // Delete Account Success
  if (deleteState.success === true) {
    return <Redirect to={{ pathname: USER_CONTROL_PANEL }} />;
  }

  // User details loading
  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="py-16">
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
              <Typography color="textPrimary">
                {`${data._id} - ${data.name}`}
              </Typography>
            </Breadcrumbs>
          </div>
          {/* Profile Update */}
          <div className="mb-16">
            <h4 className="font-semibold text-2xl py-2">Profile</h4>
            <hr />

            <ProfileUpdate data={data} userId={userID} />
          </div>
          {/* Profile Update End */}
          {/* History */}
          <div className="mb-16">
            <h4 className="font-semibold text-2xl py-2">History</h4>
            <hr />

            <History data={data.history} />
          </div>
          {/* History End */}
          {/* Delete Account */}
          <div className="mb-16">
            <h4 className="font-semibold  text-2xl py-2 text-red-600">
              Delete Account
            </h4>
            <hr />
            <div>
              <p className="my-3">
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
