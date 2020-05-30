import React, { Fragment } from "react";
import { FormControl, Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

interface ISearchBar {
  handleSearchValue(event: React.ChangeEvent<HTMLInputElement>): any;
  searchValue: string;
}

const SearchBar = ({ handleSearchValue, searchValue }: ISearchBar) => {
  return (
    <Fragment>
      {/* <Typography>Search</Typography> */}
      <div className="h-full flex justify-center items-center ">
        <FormControl
          style={{
            width: "90%",
          }}
        >
          <Input
            id="search-input"
            placeholder="Search Your Product"
            value={searchValue}
            onChange={handleSearchValue}
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </Fragment>
  );
};
export default SearchBar;
