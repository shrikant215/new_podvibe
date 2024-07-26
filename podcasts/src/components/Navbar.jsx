import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


function Navbar({   setOpenSigniN, isLogin, loginUser, setmenuOpen, menuOpen, setIsLogin, setSnackbarOpen, setSnackbarMessage, userData }) {
  
  const menuHanckeClick = () => {
    setmenuOpen(!menuOpen)
    }

    
  
  return (
    <div className={styles.navbarDiv}>
      <MenuIcon onClick={menuHanckeClick} style={{cursor:'pointer'}} />
      {Object.keys(userData)?.length > 0 || loginUser ?  <div className={styles.wcdata}>Welcome,  {loginUser}   {userData.displayName} </div> : <>&nbsp;</>}
          
      {Object.keys(userData)?.length > 0 || loginUser ?( 
        <>
          <div>
            <Avatar src={userData.image}>
            {userData.displayName.charAt(0).toUpperCase()}
            {loginUser.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </>
      ) : (
        <>
          <div
            className={styles.loginButton}
            onClick={() => setOpenSigniN(true)}
          >
           <div className={styles.PersonRounded}> <PersonRounded /> </div>
            <div>Login</div> 
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
