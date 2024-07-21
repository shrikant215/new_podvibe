import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
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


  
  const menuHanckeClick = () => {
    setmenuOpen(!menuOpen)
    }

    
  
  return (
    <div className={styles.navbarDiv}>
      <MenuIcon onClick={menuHanckeClick} style={{cursor:'pointer'}} />
      {Object.keys(userData)?.length > 0 || loginUser ?  <div style={{fontSize:'20px',fontWeight:'600'}}>Welcome,  {loginUser}   {userData.displayName} </div> : <>&nbsp;</>}
          
      {Object.keys(userData)?.length > 0 || loginUser ?( 
        <>
          <div>
            <Avatar src={userData.image}>
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
