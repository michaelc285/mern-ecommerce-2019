import React, { useMemo } from "react";
import { Paper } from "@material-ui/core";
import { IUserShippingDetailsBody } from "../../../types/interfaces";
import { NavLink } from "react-router-dom";
import { USER_PROFILE } from "../../../path";

interface IShippingInfo {
  contactDetails: IUserShippingDetailsBody;
}

const addressToString = (contactDetails: IUserShippingDetailsBody) => {
  if (Object.keys(contactDetails).length === 5) {
    const {
      addressLine1,
      addressLine2,
      townOrCity,
      postalCode,
      phone,
    } = contactDetails;
    return (
      <div className="py-3">
        <p className="ml-2 mb-3">
          <span className="block font-semibold">Address:</span>
          {`${addressLine1}, ${addressLine2}, ${townOrCity}, ${postalCode}`}
        </p>
        <div className="ml-2 flex justify-between ">
          <p className="font-semibold">Contact Number:</p>
          <p className="mr-2">{phone}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-3">
        <p className="text-center font-mono font-light text-gray-700  sm:text-lg">
          Please Edit Shipping Details First
        </p>
      </div>
    );
  }
};

const ShippingInfo = ({ contactDetails }: IShippingInfo) => {
  const addressString = useMemo(() => addressToString(contactDetails), [
    contactDetails,
  ]);

  return (
    <Paper elevation={1}>
      {/* Title */}
      <div className="bg-gray-400">
        <h6 className="font-semibold py-2 ml-2 uppercase">Shipping Details</h6>
      </div>
      {/* Title End */}
      {/* Address */}
      <div className="">{addressString}</div>
      {/* Address End */}
      {/* Modify Address Button */}
      <div className="border-top border-solid py-1">
        <NavLink
          exact
          to={USER_PROFILE}
          className="ml-2 text-blue-500 hover:no-underline"
        >
          Edit Shipping Details
        </NavLink>
      </div>
      {/* Modify Address Button End*/}
    </Paper>
  );
};

export default ShippingInfo;
