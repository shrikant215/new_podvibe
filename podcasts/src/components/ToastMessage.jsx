import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from '../redux/snackbarSlice';
function ToastMessage({ snackbarOpen, snackbarMessage, setSnackbarOpen }) {
  const dispatch = useDispatch();
  const {open, message, severity} = useSelector((state) => state.snackbar);


const handleClose = () => {
  dispatch(closeSnackbar());
};

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}

export default ToastMessage;
