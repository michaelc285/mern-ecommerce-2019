import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import {
  updateAddressByUser,
  cleanUpdateAddressState,
} from "../../../context/actions/AuthAction";
//Components
import { CircularProgress, Button } from "@material-ui/core";
import { IUserAddressBody } from "../../../types/interfaces";

interface IAddressUpdate {
  data: IUserAddressBody;
}

const AddressUpdate = ({ data }: IAddressUpdate) => {
  const dispatch = useDispatch();
  const { isLoading, errors } = useSelector(
    (state: RootState) => state.addressUpdate
  );

  const [content, setContent] = useState({
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    townOrCity: data.townOrCity,
    postalCode: data.postalCode,
  });

  // HandleChange
  const handleChangeTextContent = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;
    setContent({ ...content, [name]: value });
  };

  const handleReset = () => {
    setContent({
      addressLine1: "",
      addressLine2: "",
      townOrCity: "",
      postalCode: "",
    });
    dispatch(cleanUpdateAddressState());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: IUserAddressBody = content;

    dispatch(updateAddressByUser(body));
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
        {/* Address Line 1 */}
        <div className="flex">
          <div className="p-1 mb-3 w-full">
            <label
              htmlFor="addressLine1_input"
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
            >
              Address Line 1
            </label>
            <input
              id="addressLine1_input"
              className={` focus:outline-none focus:shadow-outline border-2 ${
                errors.includes("EMAIL_EXIST")
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300 bg-white"
              } rounded-lg py-2 px-4 block w-full appearance-none leading-normal`}
              type="text"
              placeholder={"eg: Old Trafford"}
              name="addressLine1"
              value={content.addressLine1}
              onChange={handleChangeTextContent}
            />
            {errors.includes("EMAIL_EXIST") && (
              <p className="text-sm text-red-500 py-1">
                An email already exisits
              </p>
            )}
          </div>
        </div>
        {/* Address Line 1 End */}
        {/* Address Line 2 */}
        <div className="flex">
          <div className="p-1 mb-3 w-full ">
            <label
              htmlFor="addressLine2_input"
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
            >
              Address Line 2
            </label>
            <input
              id="addressLine2_input"
              className={` focus:outline-none focus:shadow-outline border-2 ${
                errors.includes("EMAIL_EXIST")
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300 bg-white"
              } rounded-lg py-2 px-4 block w-full appearance-none leading-normal`}
              placeholder={"eg: Sir Matt Busby Way, Trafford Park, Stretford"}
              type="text"
              name="addressLine2"
              value={content.addressLine2}
              onChange={handleChangeTextContent}
            />
            {errors.includes("EMAIL_EXIST") && (
              <p className="text-sm text-red-500 py-1">
                An email already exisits
              </p>
            )}
          </div>
        </div>
        {/* Address Line 2 End */}
        <div className="flex flex-wrap mb-2">
          {/* Town or city */}
          <div className="p-1 mb-3 w-full md:w-2/3">
            <label
              htmlFor="townOrCity_input"
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
            >
              Town or City
            </label>
            <input
              id="townOrCity_input"
              className={` focus:outline-none focus:shadow-outline border-2 ${
                errors.includes("PASSWORD_FORMAT")
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300 bg-white"
              } rounded-lg py-2 px-4 block w-full sm:w-8/12 md:w-6/12 appearance-none leading-normal`}
              type="text"
              placeholder="eg: Manchester"
              name="townOrCity"
              value={content.townOrCity}
              onChange={handleChangeTextContent}
            />
            {errors.includes("PASSWORD_FORMAT") && (
              <p className="text-sm text-red-500 py-1">
                Password's length should be within 4 - 16
              </p>
            )}
          </div>
          {/* Town or city End */}
          {/* Postal code */}
          <div className="p-1 mb-3 w-full md:w-1/3">
            <label
              htmlFor="postcode_input"
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
            >
              Postal code
            </label>
            <input
              id="postcode_input"
              className={` focus:outline-none focus:shadow-outline border-2 ${
                errors.includes("PASSWORD_FORMAT")
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300 bg-white"
              } rounded-lg py-2 px-4 block w-full sm:w-8/12 md:w-6/12 appearance-none leading-normal`}
              placeholder="eg: M16 0RA"
              type="text"
              name="postalCode"
              value={content.postalCode}
              onChange={handleChangeTextContent}
            />
            {errors.includes("PASSWORD_FORMAT") && (
              <p className="text-sm text-red-500 py-1">
                Password's length should be within 4 - 16
              </p>
            )}
          </div>
          {/* Postcode End */}
        </div>

        {/* Submit Button */}
        <div className="p-1 mb-3 flex">
          <Button
            aria-label="submit_button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Update Address
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

export default AddressUpdate;
