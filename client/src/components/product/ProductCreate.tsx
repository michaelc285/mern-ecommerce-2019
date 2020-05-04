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
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { DropzoneArea } from "material-ui-dropzone";
//import FileUpload from "../utils/FileUpload";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      border: "1px solid red",
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
  const handleChangePrice = (e: any) => setPrice(e.target.value);
  const handleChangeType = (e: ITarget) => setType(e.target.value);
  const handleChangeImages = (files: string[]) => setImages(files);

  const handleSubmit = () => {};
  const handleSubmitTest = async () => {
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
        type: "test type",
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

      console.log(createProduct);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        border: "1px solid red",
      }}
    >
      <h1>Create Product</h1>
      <DropzoneArea
        acceptedFiles={["image/jpeg", "image/png", "image/jpg"]}
        showPreviews={false}
        maxFileSize={1000000}
        onChange={(files) => handleChangeImages(files)}
      />
      {/* <FileUpload handleImages={handleImages} /> */}

      <form
        noValidate
        className={classes.root}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" value={title} onChange={handleChangeTitle} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                id="description"
                label="description"
                multiline
                rows={4}
                value={description}
                onChange={handleChangeDescription}
              />
            </FormControl>
          </Grid>
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
      <button onClick={handleSubmitTest}>Test button</button>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProductCreate);
