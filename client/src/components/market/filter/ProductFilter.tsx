import React, { useState, useCallback, useReducer } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../context/actions/ProductAction";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const minPrice = 0;
const maxPrice = 9999;

const ProductMenu = () => {
  const dispatch = useDispatch();

  const [selections, setSelections] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [price, setPrice] = useState<number[]>([minPrice, maxPrice]);

  const handleSelections = (selected: string[]) => setSelections(selected);
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);
  const handlePrice = (priceArr: number[]) => setPrice(priceArr);

  const HandleRefreshProducts = () => {
    console.log(searchValue);
    const body = {
      searchTerm: searchValue,
      filters: {
        type: selections,
        price,
      },
    };
    dispatch(getProducts(body));
  };
  const HandleClearProducts = () => {
    // Clean filters
    setSearchValue("");
    setSelections([]);
    setPrice([minPrice, maxPrice]);

    const body = {}; // empty body
    dispatch(getProducts(body));
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
              <div>
                <PriceRangeSlider
                  handlePrice={handlePrice}
                  price={price}
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
            </Grid>
            <hr />
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
