import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../context/store";
import { MARKET_LANDING } from "../../path";
import {
  getUserByAccessToken,
  deleteAccountByUser,
  cleanDeleteUserState,
} from "../../context/actions/AuthAction";
// Components
import { Button, LinearProgress, Typography } from "@material-ui/core";
import ProfileUpdate from "./section/ProfileUpdate";
import AddressUpdate from "./section/AddressUpdate";

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
            <h4 className="font-semibold text-2xl py-2">Address</h4>
            <hr />

            <AddressUpdate
              data={
                data && data.address
                  ? {
                      addressLine1: data.address.addressLine1,
                      addressLine2: data.address.addressLine2,
                      townOrCity: data.address.townOrCity,
                      postalCode: data.address.postalCode,
                    }
                  : {
                      addressLine1: "",
                      addressLine2: "",
                      townOrCity: "",
                      postalCode: "",
                    }
              }
            />
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
