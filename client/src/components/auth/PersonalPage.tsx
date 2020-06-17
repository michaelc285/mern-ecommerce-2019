import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../context/store";

import { getUserByAccessToken } from "../../context/actions/AuthAction";
import ProfileUpdate from "./section/ProfileUpdate";
// Components
import { Button, LinearProgress, Typography } from "@material-ui/core";

const PersonalPage = () => {
  const dispatch = useDispatch();
  const { isLoading, user: data } = useSelector(
    (state: RootState) => state.auth
  );

  // const deleteState = useSelector((state: RootState) => state.userDelete);

  useEffect(() => {
    dispatch(getUserByAccessToken());
  }, [dispatch]);

  // // Delete Account Success
  // if (deleteState.success === true) {
  //   return <Redirect to={{ pathname: USER_CONTROL_PANEL }} />;
  // }

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
            <Typography color="textPrimary">{`${data.name}`}</Typography>
          </div>
          {/* Profile Update */}
          <div className="mb-16">
            <h4 className="font-semibold text-2xl py-2">Profile</h4>
            <hr />

            <ProfileUpdate data={data} />
          </div>
          {/* Profile Update End */}

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
                onClick={() => console.log("delete myself")}
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

export default PersonalPage;
