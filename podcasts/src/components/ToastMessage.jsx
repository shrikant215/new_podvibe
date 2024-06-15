import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function ToastMessage({ snackbarOpen, snackbarMessage, setSnackbarOpen }) {
  let severity = 'info'; 

  if (snackbarMessage && typeof snackbarMessage === 'string') {
  if (snackbarMessage.includes('Successful')) {
    severity = 'success';
  } else if (snackbarMessage.includes('error')) {
    severity = 'error';
  } else if (snackbarMessage.includes('warning')) {
    severity = 'warning';
  }
}


const handleClose = () => {
  setSnackbarOpen(false);
};

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={severity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
}

export default ToastMessage;
