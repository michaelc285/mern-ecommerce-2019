import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { IUserDetailsPage } from "../../../types/interfaces";
import { RootState } from "../../../context/store";
import { USER_CONTROL_PANEL } from "../../../path";
import {
  getUserById,
  deleteUser,
  updateAccountStatus,
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
  Switch,
  Grid,
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
  const updateUser = useSelector((state: RootState) => state.userUpdate);
  const [accountStatus, setAccountStatus] = useState<boolean>();

  const handleAccountStatusChnage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const status = event.target.checked;
    setAccountStatus(status);
    dispatch(updateAccountStatus(userID, status));
    // console.log(event.target.checked);
  };

  useEffect(() => {
    if (deleteState.success === false) {
      dispatch(getUserById(userID));
    }
    setAccountStatus(data.active);

    // When Unmount
    return () => {
      if (deleteState.success) {
        dispatch(cleanDeleteUserState());
        dispatch(cleanUserDetailsState());
      }
      dispatch(cleanUpdateUserState());
    };
  }, [dispatch, userID, deleteState.success, updateUser.success, data.active]);

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
          {/* Update Account status*/}
          <section className="mb-16">
            <h4 className="font-semibold  text-2xl py-2 text-red-600">
              Account Status
            </h4>
            <hr />
            <div>
              <p className="my-3">
                Once you deactivate account, the user will also be logedout.
              </p>

              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Revoke</Grid>
                  <Grid item>
                    <Switch
                      checked={accountStatus}
                      onChange={handleAccountStatusChnage}
                      name="account-status-switch"
                    />
                  </Grid>
                  <Grid item>Activate</Grid>
                </Grid>
              </Typography>
            </div>
          </section>
          {/* Switch Account Status End */}
          {/* Delete Account */}
          <section className="mb-16">
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
          </section>
          {/* Delete End */}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
