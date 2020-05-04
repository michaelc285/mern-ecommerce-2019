import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import axios from "axios";

const FileUpload = ({ handleImages }: any) => {
  // const handleDrop = async (file: string) => {
  //   let formData = new FormData();
  //   // Require Access token to pass the Auth middleware
  //   const config: object = {
  //     header: { "content-type": "multipart/form-data" },
  //   };
  //   formData.append("image", file);

  //   try {
  //     const uploadedImage = await axios.post(
  //       "/api/product/upload/image",
  //       formData,
  //       config
  //     );

  //     setImages([...images, uploadedImage.data.data.path]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleDelete = (file: any) => {
  //   console.log(file.name);
  // };

  return (
    <div>
      <DropzoneArea
        acceptedFiles={["image/jpeg", "image/png", "image/jpg"]}
        showPreviews={false}
        maxFileSize={1000000}
        onChange={(files) => handleImages(files)}
      />
    </div>
  );
};
export default FileUpload;
