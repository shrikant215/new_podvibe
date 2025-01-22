import React from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import {openSignin} from '../redux/setSigninSlice'
function Navbar({
  setmenuOpen,
  menuOpen,
}) {
  const menuHanckeClick = () => {
    setmenuOpen(!menuOpen);
  };


  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbarDiv}>
      <MenuIcon onClick={menuHanckeClick} style={{ cursor: "pointer" }} />

      {currentUser ? (
        <div className={styles.wcdata}>
          Welcome, {currentUser.name}
        </div>
      ) : (
        <>&nbsp;</>
      )}

      {currentUser ? (
        <div>
          <Avatar src={currentUser.img}>
            {currentUser.name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      ) : (
        <div className={styles.loginButton} onClick={() => dispatch(openSignin())}>
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
