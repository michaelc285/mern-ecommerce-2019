import React, { useEffect } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

interface ICustomerDialogProps {
  isOpen: boolean;
  handleClose(): void;
  title: string;
  children: React.ReactNode;
}

const CustomDialog = ({
  isOpen,
  handleClose,
  title,
  children,
}: ICustomerDialogProps) => {
  useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomDialog;
