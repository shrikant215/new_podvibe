import React, { useState, useEffect } from "react";
import styles from "./Typescard.module.css";
import { CloseRounded, Google, Mode } from "@mui/icons-material";
import { IconButton, Modal, Snackbar } from "@mui/material";
import validator from 'validator'; // Import the validator library
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { MailRounded, PasswordRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


function Signin({ setOpenSigniN, setOpenSignUp, setIsLogin, loginDetails, setSnackbarOpen , setSnackbarMessage}) {
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [credentialErr, setcredentialErr] = useState("");
  const [emailError, setEmailError] =useState('');
  const [buttonDissable, setButtonDissable] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post(`${apiUrl}/api/login`,formData)
      
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.name); 
      loginDetails(response.data.name)
      console.log("response",response)
      setIsLogin(true)
      setSnackbarOpen(true);
      setSnackbarMessage(response.data.message)
      setOpenSigniN(false);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    }catch(err){
      console.log(err)
      setSnackbarOpen(true);
      setSnackbarMessage("wrong email or password")
    }
  };
  const handleClose = () => {
    setOpenSigniN(false);
  };

  const openSignUp = () => {
    setOpenSigniN(false);
    setOpenSignUp(true);
  };

  const areInputsFilled = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const email = formData.email;
  const password = formData.password;
  useEffect(() => {
  
    if(email) validateEmail();
    if(password) validatePassword();
    if(
      validator.isEmail(email) &&
      passwordCorrect
      ){
      setButtonDissable(false);
    }else{
      setButtonDissable(true);
    }
    areInputsFilled()
  }, [ email, password])

  const validateEmail = () => {
    if(validator.isEmail(email)){
      setEmailError('');
      // setEmailCorrect(true);
    }else{
      setEmailError("Enter a valid Email Id!");
      // setEmailCorrect(false);
    }
  }

  const validatePassword = () => {
    if(password.length < 8){
      setcredentialErr('password must be atlist 8 characters long!');
      setPasswordCorrect(false);
    }else if (password.length > 16) {
      setcredentialErr('password must be less than 16 characters long!');
      setPasswordCorrect(false);
    }else if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[^a-zA-Z\d]/g)
    ) {
      setcredentialErr('password must contain one lowercase, uppercase, \nnumber and special character!');
      setPasswordCorrect(false);
    }else{
      setcredentialErr('');
      setPasswordCorrect(true);
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const loginWithGoogle =async() => {
    window.open("http://localhost:4000/auth/google/callback", "_self")
   
  }

  return (
    <div>
    <Modal className={styles.model} open={true} onClose={handleClose}>
      <div className={styles.uplodewindo}>
        <div className={styles.customDialog}>
          <DialogTitle disableTypography className={styles.titleAndClose}>
            <div className={styles.uplodetitle}>Signin</div>
            <div className={styles.closeIcon} onClick={handleClose}>
              <CloseRounded />
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className={styles.SignupGoogle} onClick={loginWithGoogle}>
                <Google />
                Sign in with Google
              </div>

              <div className={styles.Divider}>
                <div className={styles.SignUpline} />
                or
                <div className={styles.SignUpline} />
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

              <div style={{fontSize:'10px',margin:'2px 26px 8px 26px', color:'red',}}>{emailError}</div>


              <div className={styles.SignupName}>
                <div style={{display:'flex', width:'100%', margin:'15px'}}>
                <div className={styles.SignlogoInput}>
                  <PasswordRounded />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={styles.SignupNameInput}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                  <div className={styles.SignInVis}>
                    {showPassword ? (
                      <VisibilityOff className={styles.signInVisivlility} onClick={togglePasswordVisibility} />
                    ) : (
                      <Visibility className={styles.signInVisivlility} onClick={togglePasswordVisibility} />
                    )}
                  </div>
                  </div>
              </div>

              <div style={{fontSize:'10px',color:'red',margin:'2px 26px 8px 26px', display:'block', whiteSpace: 'pre-line'}}>{credentialErr}</div>


              <div className={styles.button}>
                <button
                  className={styles.buttonInput}
                  type="submit"
                  disabled={!areInputsFilled()}
                  style={{ backgroundColor: areInputsFilled() ? '#be1adb' : '' }}
                >
                  SignIn
                </button>
              </div>

              <div className={styles.switchFormContainer}>
                <div>Don't have an account ?</div>{" "}
                <div className={styles.switchFormText} onClick={openSignUp}>
                  Create Account
                </div>
              </div>
            </form>
          </DialogContent>
        </div>
      </div>
    </Modal>


    </div>

    
  );
}

export default Signin;
