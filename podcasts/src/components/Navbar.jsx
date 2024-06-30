import React from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function Navbar({ setOpenSigniN, isLogin, loginUser, setmenuOpen, menuOpen }) {
  
  const menuHanckeClick = () => {
    setmenuOpen(!menuOpen)
    }


    const getAvatarColor = () => {
      
      if (isLogin) {
        const hash = loginUser.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360; 
        return `hsl(${hue}, 70%, 50%)`; 
      }
      return 'gray';
    };
  
  return (
    <div className={styles.navbarDiv}>
      <MenuIcon onClick={menuHanckeClick} style={{cursor:'pointer'}} />
      {isLogin ? <div style={{fontSize:'20px',fontWeight:'600'}}>Welcome,   {loginUser.charAt(0).toUpperCase() + loginUser.slice(1)} </div> : <>&nbsp;</>}

      {isLogin ? ( 
        <>
          <div>
            <Avatar  color={getAvatarColor()}>
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
