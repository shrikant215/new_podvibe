import React, { useEffect, useState } from "react";
import styles from "./Typescard.module.css";
import { CloseRounded, Google } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import validator from 'validator'; // Import the validator library
import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import {
  PersonRounded,
  MailRounded,
  PasswordRounded,
  TroubleshootRounded,
} from "@mui/icons-material";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


function Signup({ setOpenSignUp, setOpenSigniN }) {
  const [nameCorrect, setNameCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [credentialErr, setcredentialErr] = useState("");
  const [emailError, setEmailError] =useState('');
  const [buttonDissable, setButtonDissable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = async () => {
    try {
      console.log("handleSendOTP",formData.email);
      const response = await axios.post(`${apiUrl}/api/sendSignupOTP`, { email: formData.email });
      console.log("optResopnce",response)
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    // Added event parameter
    event.preventDefault(); // Prevent form submission
    try {
      const response = await axios.post(
        `${apiUrl}/api/signup`,
        formData
      );
      console.log(response.data.message);
      alert("Signup successful");
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);

    }
  };

  const handleClose = () => {
    setOpenSignUp(false);
  };

  const openSignIn = () => {
    setOpenSignUp(false);
    setOpenSigniN(true);
  };

    // Function to check if all input fields are filled
    const areInputsFilled = () => {
      const boolien = Object.values(formData).every(value => value.trim() !== '');
      setButtonDissable(boolien);
    };

    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    useEffect(() => {
    
      if(name !== "") validateName();
      if(email) validateEmail();
      if(password) validatePassword();
      if(
        name !== "" &&
        validator.isEmail(email) &&
        passwordCorrect &&
        nameCorrect
        ){
        setButtonDissable(false);
      }else{
        setButtonDissable(true);
      }
      areInputsFilled()
    }, [name, email, password])

    const validateName = () => {
      if(name.length < 4){
           setNameCorrect(false);
           setcredentialErr("Name must be atleast 4 characters long!")
      }else{
           setNameCorrect(true);
           setcredentialErr('')
      }
    }

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



  return (
    <Modal className={styles.model} open={true} onClose={handleClose}>
      <div className={styles.uplodewindo}>
        <div className={styles.customDialog}>
          <DialogTitle disableTypography className={styles.titleAndClose}>
            <div className={styles.uplodetitle}>SignUp</div>
            <div className={styles.closeIcon} onClick={handleClose}>
              <CloseRounded />
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className={styles.SignupGoogle} >
                <Google />
                Sign in with Google
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

              <div style={{fontSize:'10px',margin:'2px 26px 8px 26px', color:'red',}}>{emailError}</div>

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

              <div style={{fontSize:'10px',color:'red',margin:'2px 26px 8px 26px', display:'block', whiteSpace: 'pre-line'}}>{credentialErr}</div>


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

              <div onClick={handleSendOTP} style={{fontSize:'17px',fontWeight:'500',margin:'10px', color:'#be1adb', cursor:'pointer'}}>Send OTP</div>

              <div className={styles.button}>
                <button
                  className={styles.buttonInput}
                  type="submit"
                  // disabled={!buttonDissable}
                  style={{ backgroundColor: buttonDissable ? '#be1adb' : '' }}
                >
                  Create Account
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
