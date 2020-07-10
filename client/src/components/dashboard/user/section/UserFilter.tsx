import React from "react";
import { getUsersByFilter } from "../../../../context/actions/AuthAction";
import { useDispatch } from "react-redux";
import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Input,
  InputAdornment,
} from "@material-ui/core";

// Icons
import SearchIcon from "@material-ui/icons/Search";

const objectToArray = (object: any) => {
  return Object.keys(object).filter((key) => (object as any)[key] === true);
};

const UserFilter = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [role, setRole] = React.useState({ admin: true, user: true });
  const [status, setStatus] = React.useState({ active: true, inactive: true });

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole({ ...role, [event.target.name]: event.target.checked });
  };

  const handleStatusCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    const statusArr = objectToArray(status);
    const roleArr = objectToArray(role);
    const searchObj = {
      searchTerm,
      filters: {
        role: roleArr,
        active: statusArr,
      },
    };

    dispatch(getUsersByFilter(searchObj));
  };

  return (
    <div className="flex flex-col">
      {/* Search Term input field */}
      <Input
        id="search-term-input"
        placeholder="Search User"
        className="mb-3"
        onChange={handleSearchTerm}
        value={searchTerm}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      {/* Search Term input field End */}
      {/* Role Checkbox*/}
      <FormControl component="fieldset">
        <FormLabel component="legend">Role</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Checkbox
                checked={role.admin}
                onChange={handleRoleCheckbox}
                name="admin"
              />
            }
            label="Admin"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={role.user}
                onChange={handleRoleCheckbox}
                name="user"
              />
            }
            label="User"
          />
        </FormGroup>
      </FormControl>
      {/* Role Checkbox End */}

      {/* Satus Checkbox*/}
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Checkbox
                checked={status.active}
                onChange={handleStatusCheckbox}
                name="active"
              />
            }
            label="Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status.inactive}
                onChange={handleStatusCheckbox}
                name="inactive"
              />
            }
            label="Inactive"
          />
        </FormGroup>
      </FormControl>
      {/* Status Checkbox End */}

      {/* Submit Button */}
      <Button color="secondary" variant="outlined" onClick={handleSubmit}>
        Search
      </Button>
      {/* Submit button end */}
    </div>
  );
};

export default UserFilter;
