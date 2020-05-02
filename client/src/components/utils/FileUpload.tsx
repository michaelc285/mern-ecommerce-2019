import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

const FileUpload = ({ handleFiles }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleSave = (files: any) => {
    handleFiles(files);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Image</Button>
      <DropzoneDialog
        open={isOpen}
        onSave={handleSave}
        onClose={handleClose}
        acceptedFiles={["image/jpeg", "image/png", "image/jpg"]}
        showPreviews={true}
        maxFileSize={1000000}
      />
    </div>
  );
};
export default FileUpload;
