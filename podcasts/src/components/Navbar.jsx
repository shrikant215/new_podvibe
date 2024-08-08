import React from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function Navbar({
  setOpenSigniN,
  isLogin,
  loginUser,
  setmenuOpen,
  menuOpen,
  setIsLogin,
  setSnackbarOpen,
  setSnackbarMessage,
  userData,
}) {
  const menuHanckeClick = () => {
    setmenuOpen(!menuOpen);
  };

  const hasUserData = userData && Object.keys(userData).length > 0;
  const displayName = hasUserData ? userData.displayName : '';
  const avatarSrc = hasUserData ? userData.image : '';

  return (
    <div className={styles.navbarDiv}>
      <MenuIcon onClick={menuHanckeClick} style={{ cursor: "pointer" }} />
      {hasUserData || loginUser ? (
        <div className={styles.wcdata}>
          Welcome, {loginUser} {displayName}
        </div>
      ) : (
        <>&nbsp;</>
      )}

      {hasUserData || loginUser ? (
        <div>
          <Avatar src={avatarSrc}>
            {displayName.charAt(0).toUpperCase()}
            {loginUser && loginUser.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      ) : (
        <div className={styles.loginButton} onClick={() => setOpenSigniN(true)}>
          <div className={styles.PersonRounded}>
            <PersonRounded />
          </div>
          <div>Login</div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
