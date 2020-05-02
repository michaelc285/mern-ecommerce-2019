import React, { useState } from "react";
import { useFormik } from "formik";
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
import FileUpload from "../utils/FileUpload";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      border: "1px solid red",
    },
  },
}));
const ProductCreate = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      description: "",
    },
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });
  const handleFiles = (files: any) => {
    setFiles(files);
    console.log(files);
  };

  const handleSubmit = () => {
    console.log(files);
    const config: any = {
      header: { "content-type:": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("file", files[0]);
    axios
      .post("/api/product/upload/image", formData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      maxWidth="md"
      style={{
        border: "1px solid red",
      }}
    >
      <h1>Create Product</h1>

      <FileUpload handleFiles={handleFiles} />

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
              <Input
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
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
                value={formik.values.price}
                onChange={formik.handleChange}
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
                value={formik.values.description}
                onChange={formik.handleChange}
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
    </Container>
  );
};

export default ProductCreate;
