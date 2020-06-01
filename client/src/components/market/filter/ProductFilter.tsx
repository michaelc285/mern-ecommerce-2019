import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import CategorySelection from "./section/CategorySelection";
import PriceRangeSlider from "./section/PriceRangeSlider";
import SearchBar from "./section/SearchBar";
import { useDispatch } from "react-redux";
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
        <h1 className="text-xl">Filter</h1>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div className="w-full">
          <div className="flex flex-col items-center">
            {/* Option Group */}
            <div className="w-full flex flex-col md:flex-row">
              {/* Search Bar */}
              <div className="flex-0 md:flex-1 mb-3 md:mb-0">
                <SearchBar
                  handleSearchValue={handleSearchValue}
                  searchValue={searchValue}
                />
              </div>
              {/* Price Range Slider */}
              <div className="flex-0 md:flex-1 mb-3 md:mb-0">
                <PriceRangeSlider
                  handlePrice={handlePrice}
                  price={price}
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
              {/* CategorySelection */}
              <div className="flex-0 md:flex-1 mb-3 md:mb-0">
                <CategorySelection
                  handleSelections={handleSelections}
                  checked={selections}
                />
              </div>
            </div>

            {/* Search Button Group*/}
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
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ProductMenu;
