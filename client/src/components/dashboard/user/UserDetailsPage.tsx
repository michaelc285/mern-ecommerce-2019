import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserDetailsPage } from "../../../types/interfaces";
import { RootState } from "../../../context/store";
import { getUserById } from "../../../context/actions/AuthAction";
// Components
import {
  Button,
  LinearProgress,
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
    dispatch(getUserById(userID));
  }, [dispatch, userID]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LinearProgress color="secondary" />
      </div>
    );
  }
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
    <div className="h-screen">
      <div className="container mx-auto">
        <div className="mt-16">
          {/* Profile Update */}
          <div className="mb-6">
            <h4 className="font-semibold">{data._id}'s Profile</h4>
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
            {<History data={data.history} />}
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
                onClick={() => console.log(`Delete ${data._id}`)}
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
