import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PRODUCT_CONTROL_PANEL } from "../../../path";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../context/actions/ProductAction";
import { ITarget } from "../../../types/interfaces";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  FormControl,
  Button,
  Grid,
  InputLabel,
  Input,
  InputAdornment,
  TextField,
  Select,
  Typography,
  FormHelperText,
  Breadcrumbs,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { DropzoneArea } from "material-ui-dropzone";

const ProductCreate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);

  // Handler
  const handleChangeTitle = (e: ITarget) => setTitle(e.target.value);
  const handleChangeDescription = (e: ITarget) =>
    setDescription(e.target.value);
  const handleChangePrice = (e: any) => setPrice(Number(e.target.value));
  const handleChangeType = (e: any) => setType(e.target.value);
  const handleChangeImages = (files: string[]) => setImages(files);

  // Submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const productInfo = {
      title,
      price,
      description,
      type,
    };
    dispatch(createProduct(images, productInfo));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="my-10">
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink
              exact
              to={PRODUCT_CONTROL_PANEL}
              style={{ textDecoration: "none" }}
            >
              <span className="text-black">Prodcut</span>
            </NavLink>

            <Typography color="textPrimary">Create Product</Typography>
          </Breadcrumbs>

          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={5}>
              {/* Prodcut Title field */}
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleChangeTitle}
                  />
                </FormControl>
                <FormHelperText>Required</FormHelperText>
              </Grid>

              {/* Pirce input box */}
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor="price">Price</InputLabel>
                  <Input
                    type="number"
                    id="price"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    value={price}
                    onChange={handleChangePrice}
                  />
                </FormControl>
                <FormHelperText>Required</FormHelperText>
              </Grid>

              {/* Category selection box */}
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor="outlined-category-selection">
                    Category
                  </InputLabel>
                  <Select
                    native
                    value={type}
                    onChange={handleChangeType}
                    label="category"
                    inputProps={{
                      name: "category",
                      id: "outlined-category-selection",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"VEGETABLE"}>Vegetable</option>
                    <option value={"FRUIT"}>Fruit</option>
                    <option value={"MEAT"}>Meat</option>
                  </Select>
                </FormControl>
                <FormHelperText>Required</FormHelperText>
              </Grid>

              {/* Description field */}
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <TextField
                    id="description"
                    label="description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleChangeDescription}
                  />
                </FormControl>
                <FormHelperText>Required</FormHelperText>
              </Grid>

              {/* Image drop zone */}
              <Grid item xs={12}>
                <Typography variant="h6">Product image(s)</Typography>
                <DropzoneArea
                  acceptedFiles={["image/jpeg", "image/png", "image/jpg"]}
                  showPreviews={false}
                  maxFileSize={1000000}
                  onChange={(files) => handleChangeImages(files)}
                />
              </Grid>

              {/* Submit button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export default ProductCreate;
