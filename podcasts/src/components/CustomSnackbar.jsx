import React from "react";
import { Snackbar } from "@mui/material";

function CustomSnackbar({ openSnackbar, message, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
    />
  );
}

export default CustomSnackbar;
