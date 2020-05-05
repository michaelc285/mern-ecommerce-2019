import React, { Fragment } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Paper, InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

interface ISearchBar {
  handleSearchValue: Function;
  searchValue: string;
}

const SearchBar = ({ handleSearchValue, searchValue }: ISearchBar) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography>Search</Typography>

      <Paper component="form" elevation={1}>
        <InputBase
          placeholder="Search Your Product"
          inputProps={{ "aria-label": "search product bar" }}
          value={searchValue}
          onChange={(e: any) => handleSearchValue(e.target.value)}
        />
      </Paper>
    </Fragment>
  );
};
export default SearchBar;
