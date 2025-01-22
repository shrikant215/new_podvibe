import React from "react";
import styles from "./Sidebar.module.css";
import LogoImage from "../images/Logo.png";
import {
  HomeRounded,
  CloseRounded,
  SearchRounded,
  UploadRounded,
  LogoutRounded,
  FavoriteRounded,
  CloudUploadRounded,
  LoginRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {openSignin} from '../redux/setSigninSlice'
import {logout} from '../redux/userSlice';
import {useNavigate} from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL;

function Sidebar({ menuOpen, setUplodeOpen, setmenuOpen }) {
const dispatch = useDispatch();
const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const handleLogout = () => {    
    dispatch(logout())
    navigate('/')
    console.log("Logged out successfully");
  };  

  const checkIsLoginAction = () => {
    if(!currentUser){
      dispatch(openSignin());
    }else{
      setUplodeOpen(true)
    }
  }

  const checkFavIsLoginAction = () => {
    if(!currentUser){
      dispatch(openSignin());
    }
  }



  return (
    <div className={`${styles.menuContainer} ${menuOpen ? styles.open : ''}`}>
      <div className={styles.flex}>
        <div className={styles.logo}>
          <img className={styles.logoPng} src={LogoImage} alt="Logo" />
          PODVIBE{" "}
        </div>
        <div className={styles.close}>
          <CloseRounded  className={styles.closeRound} onClick={() => {setmenuOpen(false)}} />
        </div>
      </div>

        <Link key={'/'} to={'/'} style={{ textDecoration: "none" }}>
          <div className={styles.elements}>
          <HomeRounded />
            <div className={styles.navText}>Dashboard</div>
          </div>
        </Link>

        <Link key={'/search'} to={'/search'} style={{ textDecoration: "none" }}>
          <div className={styles.elements}>
          <SearchRounded />
            <div className={styles.navText}>Search</div>
          </div>
        </Link>

        <Link onClick={checkFavIsLoginAction} to={currentUser ? '/favourites' : ''} key={'/favourites'}  style={{ textDecoration: "none" }}>
          <div className={styles.elements}>
          <FavoriteRounded />
            <div className={styles.navText}>Favourites</div>
          </div>
        </Link>

      <hr />

      <div className={styles.elements} onClick={checkIsLoginAction}>
            <UploadRounded/>
            <div className={styles.navText}>Uplode</div>
          </div>



      {currentUser ? (
        <div className={styles.elements} onClick={handleLogout}>
          <LogoutRounded/>
          <div className={styles.navText}>Log Out</div>
        </div>
      ) : (
        <div className={styles.elements} onClick={() => { dispatch(openSignin()) }}>
          <LoginRounded/>
          <div className={styles.navText}>Log In</div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
