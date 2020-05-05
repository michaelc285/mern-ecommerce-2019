import React, { useState } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { ITarget } from "../../types/interfaces";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
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
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));
const ProductCreate = ({ auth }: any) => {
  const classes = useStyles();
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    // Add image to formData
    images.forEach((file) => formData.append("image", file));

    try {
      // Check all fields done?
      // ######################
      const uploadedImage = await axios.post(
        "/api/product/upload/image",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const newProduct: object = {
        title,
        price,
        description,
        type: type,
        images: uploadedImage.data.filesPath,
      };

      // Create Product
      const createProduct = await axios.post(
        "/api/product/create",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container maxWidth="md">
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          {/* Page Title */}
          <Grid item xs={12}>
            <Typography variant="h4">Create Product</Typography>
          </Grid>
          {/* Prodcut Title field */}
          <Grid item xs={12}>
            <FormControl required fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" value={title} onChange={handleChangeTitle} />
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
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProductCreate);
