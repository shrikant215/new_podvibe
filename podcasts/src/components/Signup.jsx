import React, { useEffect, useState } from "react";
import styles from "./Typescard.module.css";
import { CloseRounded, Google } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import validator from "validator"; // Import the validator library
import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { useGoogleLogin } from '@react-oauth/google';
import { CircularProgress } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import {signUp} from '../api/index.js'
import {
  PersonRounded,
  MailRounded,
  PasswordRounded,
  TroubleshootRounded,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { openSignin } from '../redux/setSigninSlice';
import {loginStart, loginSuccess, loginFailure} from '../redux/userSlice';
import { openSnackbar, closeSnackbar} from '../redux/snackbarSlice';

const apiUrl = process.env.REACT_APP_API_URL;

function Signup({
  setOpenSignUp
}) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [nameCorrect, setNameCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [credentialErr, setcredentialErr] = useState("");
  const [emailError, setEmailError] = useState("");
  const [buttonDissable, setButtonDissable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = async () => {
    try {
      console.log("handleSendOTP", formData.email);
      const response = await axios.post(`${apiUrl}/auth/sendSignupOTP`, {
        email: formData.email,
      });
      console.log("optResopnce", response);
      dispatch(openSnackbar({message: "OTP sent successfully!", severity: 'success'}));
    } catch (error) {
      if(error.status === 400){
        dispatch(openSnackbar({message: error.response.data.message, severity: 'error'}));
      }
      if (error.status === 500) {
      dispatch(openSnackbar({message: "Failed to send OTP. Please try again.", severity: 'error'}));
      }
      console.error("Failed to send OTP:", error);
      if(error.message === "Network Error"){
      dispatch(openSnackbar({message: "Network Error", severity: 'error'}));
      }
    }
  };

  const handleSubmit = async (event) => {
    dispatch(loginStart());
        event.preventDefault(); 
        console.log("fffffff");
    try {
      const response = await signUp(formData);
      console.log("res",response)
      setOpenSignUp(false);
      dispatch(loginSuccess(response.data));
      dispatch(openSnackbar({message: "Signup successful!", severity: 'success'}));
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
      dispatch(openSnackbar({message: "some thing went wrong!", severity: 'Error'}));

    }
  };

  const handleClose = () => {
    setOpenSignUp(false);
  };

  const openSignIn = () => {
    setOpenSignUp(false);
   dispatch(openSignin())
  };

  // Function to check if all input fields are filled
  const areInputsFilled = () => {
    const boolien = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setButtonDissable(boolien);
  };

  const name = formData.name;
  const email = formData.email;
  const password = formData.password;
  useEffect(() => {
    if (name !== "") validateName();
    if (email) validateEmail();
    if (password) validatePassword();
    if (
      name !== "" &&
      validator.isEmail(email) &&
      passwordCorrect &&
      nameCorrect
    ) {
      setButtonDissable(false);
    } else {
      setButtonDissable(true);
    }
    areInputsFilled();
  }, [formData, nameCorrect, passwordCorrect]);

  const validateName = () => {
    if (name.length < 4) {
      setNameCorrect(false);
      setcredentialErr("Name must be atleast 4 characters long!");
    } else {
      setNameCorrect(true);
      setcredentialErr("");
    }
  };

  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter a valid Email Id!");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setcredentialErr("password must be atlist 8 characters long!");
      setPasswordCorrect(false);
    } else if (password.length > 16) {
      setcredentialErr("password must be less than 16 characters long!");
      setPasswordCorrect(false);
    } else if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[^a-zA-Z\d]/g)
    ) {
      setcredentialErr(
        "password must contain one lowercase, uppercase, \nnumber and special character!"
      );
      setPasswordCorrect(false);
    } else {
      setcredentialErr("");
      setPasswordCorrect(true);
    }
  };

  // const loginWithGoogle = () => {
  //   setLoding(true);
  //   window.open(`${apiUrl}/auth/google/callback`, "_self");
  // };

  // const fetchUserData = async () => {
  //   setLoding(true);
  //   try {
  //     const response = await axios.get(`${apiUrl}/sigin/sucess`, {
  //       withCredentials: true,
  //     });
  //     console.log(response,"rrrrrrrrrrrrrrrr")
  //     setLoding(false);
  //   } catch (err) {
  //     console.error("Error fetching user data:", err);
  //     setLoding(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <Modal className={styles.model} open={true} onClose={handleClose}>
      <div className={styles.uplodewindo}>
        <div className={styles.customDialogs}>
          <DialogTitle disableTypography className={styles.titleAndClose}>
            <div className={styles.uplodetitle}>SignUp</div>
            <div className={styles.closeIcon} onClick={handleClose}>
              <CloseRounded />
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className={styles.SignupGoogle}>
              {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : (
                  <>
                    <Google /> Sign in with Google
                  </>
                )}
              </div>

              <div className={styles.Divider}>
                <div className={styles.SignUpline} />
                or
                <div className={styles.SignUpline} />
              </div>

              <div className={styles.SignupName}>
                <PersonRounded />
                <input
                  type="text"
                  name="name"
                  placeholder="Fill Name"
                  className={styles.SignupNameInput}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.SignupName}>
                <MailRounded />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  className={styles.SignupNameInput}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div
                style={{
                  fontSize: "10px",
                  margin: "2px 26px 8px 26px",
                  color: "red",
                }}
              >
                {emailError}
              </div>

              <div className={styles.SignupName}>
                <PasswordRounded />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.SignupNameInput}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div
                style={{
                  fontSize: "10px",
                  color: "red",
                  margin: "2px 26px 8px 26px",
                  display: "block",
                  whiteSpace: "pre-line",
                }}
              >
                {credentialErr}
              </div>

              <div className={styles.SignupName}>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className={styles.SignupNameInput}
                  value={formData.otp}
                  onChange={handleInputChange}
                />
              </div>

              <div
                onClick={handleSendOTP}
                style={{
                  fontSize: "17px",
                  fontWeight: "500",
                  margin: "10px",
                  color: "#be1adb",
                  cursor: "pointer",
                }}
              >
                Send OTP
              </div>

              <div className={styles.button}>
                <button
                  className={styles.buttonInput}
                  type="submit"
                  disabled={!buttonDissable}
                  style={{ backgroundColor: buttonDissable ? "#be1adb" : "" }}
                >
                  {loading ? (
                    <CircularProgress sx={{ color: 'white' }} size={20} />
                  ) : (
                    <> Create Account</>
                  )}
                </button>
              </div>

              <div className={styles.switchFormContainer}>
                <div>Already have an account ?</div>
                <div className={styles.switchFormText} onClick={openSignIn}>
                  SignIn
                </div>
              </div>
            </form>
          </DialogContent>
        </div>
      </div>
    </Modal>
  );
}

export default Signup;
