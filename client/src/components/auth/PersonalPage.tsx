import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../context/store";
import { MARKET_LANDING } from "../../path";
import {
  getUserByAccessToken,
  deleteAccountByUser,
  cleanDeleteUserState,
  cleanUpdateUserState,
  cleanUpdateContactDetailsState,
} from "../../context/actions/AuthAction";
// Components
import { Button, LinearProgress } from "@material-ui/core";
import ProfileUpdate from "./section/ProfileUpdate";
import ShippingDetailsUpdate from "./section/ShippingDetailsUpdate";

const PersonalPage = () => {
  const dispatch = useDispatch();
  const { isLoading, user: data } = useSelector(
    (state: RootState) => state.auth
  );

  const deleteState = useSelector((state: RootState) => state.userDelete);

  useEffect(() => {
    dispatch(getUserByAccessToken());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (deleteState.success) {
        dispatch(cleanDeleteUserState());
      }
      dispatch(cleanUpdateUserState());
      dispatch(cleanUpdateContactDetailsState());
    };
  }, [dispatch, deleteState.success]);

  // Delete Account Success
  if (deleteState.success === true) {
    return <Redirect to={{ pathname: MARKET_LANDING }} />;
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
          {/* Profile Update */}
          <div className="mb-16">
            <h4 className="font-semibold text-2xl py-2">
              {data.name}'s Profile
            </h4>
            <hr />

            <ProfileUpdate data={data} />
          </div>
          {/* Profile Update End */}
          {/* Address Update */}
          <div className="mb-16">
            <h4 className="font-semibold text-2xl py-2">Contact Details</h4>
            <hr />

            <ShippingDetailsUpdate contactDetails={data.contactDetails} />
          </div>
          {/* Address update End */}

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
                onClick={() => dispatch(deleteAccountByUser())}
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
