<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React from "react";
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
<<<<<<< HEAD
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


function Navbar({ setOpenSigniN, isLogin, loginUser, setmenuOpen, menuOpen, setIsLogin, setSnackbarOpen, setSnackbarMessage }) {

  const [userData, setUserdata] = useState({});

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/sigin/sucess", { withCredentials: true });
        setUserdata(response.data.user);
        console.log("User Data:", response.data.user);
        setIsLogin(true)
      } catch (err) {
        console.error('Error fetching user data:', err);
        
      }
    };

    useEffect(() => {
      fetchUserData()
    }, []);


=======

function Navbar({ setOpenSigniN, isLogin, loginUser, setmenuOpen, menuOpen }) {
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
  
  const menuHanckeClick = () => {
    setmenuOpen(!menuOpen)
    }

<<<<<<< HEAD
    
=======

    const getAvatarColor = () => {
      
      if (isLogin) {
        const hash = loginUser.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360; 
        return `hsl(${hue}, 70%, 50%)`; 
      }
      return 'gray';
    };
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
  
  return (
    <div className={styles.navbarDiv}>
      <MenuIcon onClick={menuHanckeClick} style={{cursor:'pointer'}} />
<<<<<<< HEAD
      {Object.keys(userData)?.length > 0 || loginUser ?  <div style={{fontSize:'20px',fontWeight:'600'}}>Welcome,  {loginUser}   {userData.displayName} </div> : <>&nbsp;</>}
          
      {Object.keys(userData)?.length > 0 || loginUser ?( 
        <>
          <div>
            <Avatar src={userData.image}>
            {loginUser.charAt(0).toUpperCase()}
=======
      {isLogin ? <div style={{fontSize:'20px',fontWeight:'600'}}>Welcome,   {loginUser.charAt(0).toUpperCase() + loginUser.slice(1)} </div> : <>&nbsp;</>}

      {isLogin ? ( 
        <>
          <div>
            <Avatar  color={getAvatarColor()}>
              {loginUser.charAt(0).toUpperCase()}
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
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
