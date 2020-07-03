import React from "react";
import { getUsersByFilter } from "../../../../context/actions/AuthAction";
import { useDispatch } from "react-redux";
import {
  Button,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
const UserFilter = () => {
  const dispatch = useDispatch();
  const search = (filter: object) => {
    dispatch(getUsersByFilter(filter));
  };
  const [value, setValue] = React.useState({
    role: "all",
    status: "all",
    cart: "all",
    history: "all",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //{...value,value[(event.target as HTMLInputElement).name]:(event.target as HTMLInputElement).value}
    console.log(event.target as HTMLInputElement);
  };
  return (
    <div className="flex flex-col">
      <TextField label="Search Term" className="mb-3" />
      <div className="flex flex-col md:flex-col flex-wrap justify-around">
        <FormControl
          component="fieldset"
          fullWidth={true}
          style={{ border: "1px solid red" }}
        >
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="user" control={<Radio />} label="User" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            aria-label="status"
            name="status"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">History</FormLabel>
          <RadioGroup
            aria-label="history"
            name="history"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Cart</FormLabel>
          <RadioGroup
            aria-label="cart"
            name="cart"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </div>
      <Button
        color="secondary"
        onClick={() => search({ searchTerm: "Michael" })}
      >
        Search
      </Button>
    </div>
  );
};

export default UserFilter;
