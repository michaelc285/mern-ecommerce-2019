import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import CategorySelection from "./section/CategorySelection";
import PriceRangeSlider from "./section/PriceRangeSlider";
import SearchBar from "./section/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface IProductMenu {
  handleProductsSearch: Function;
}

const minPrice = 0;
const maxPrice = 9999;

const ProductMenu = ({ handleProductsSearch }: IProductMenu) => {
  const classes = useStyles();

  const [selections, setSelections] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [price, setPrice] = useState<number[]>([minPrice, maxPrice]);

  const handleSelections = (selected: string[]) => setSelections(selected);
  const handleSearchValue = (value: string) => setSearchValue(value);
  const handlePrice = (priceArr: number[]) => setPrice(priceArr);

  const HandleRefreshProducts = () => {
    const body = {
      searchTerm: searchValue,
      filters: {
        type: selections,
        price,
      },
    };
    handleProductsSearch(body);
  };

  const HandleClearProducts = () => {
    // Clean filters
    setSearchValue("");
    setSelections([]);
    setPrice([minPrice, maxPrice]);

    const body = {}; // empty body
    handleProductsSearch(body);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography>Filter</Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <SearchBar
                handleSearchValue={handleSearchValue}
                searchValue={searchValue}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <div style={{ paddingRight: "30px", paddingLeft: "30px" }}>
                <PriceRangeSlider
                  handlePrice={handlePrice}
                  price={price}
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <CategorySelection
                handleSelections={handleSelections}
                checked={selections}
              />
            </Grid>

            {/* Search Button */}
            <Grid item xs={12} sm={12}>
              <hr />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonGroup>
                  <Button
                    startIcon={<SearchIcon />}
                    size="large"
                    onClick={HandleRefreshProducts}
                  >
                    Submit
                  </Button>
                  <Button
                    endIcon={<ClearAllIcon />}
                    size="large"
                    onClick={HandleClearProducts}
                  >
                    Clear
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ProductMenu;
