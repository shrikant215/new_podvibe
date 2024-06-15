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

function Sidebar({ menuOpen, setUplodeOpen, isLogin, setIsLogin, setOpenSigniN, setMenuOpen }) {
  const menuItems = [
    {
      link: "/",
      name: "Dashboard",
      icon: <HomeRounded />,
    },
    {
      link: "/search",
      name: "Search",
      icon: <SearchRounded />,
    },
    {
      link: "/favourites",
      name: "Favourites",
      icon: <FavoriteRounded />,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    console.log("Logged out successfully");
  };

  const checkIsLoginAction = () => {
    if(!isLogin){
      setOpenSigniN(true)
    }else{
      setUplodeOpen(true)
    }
  }

  const checkFavIsLoginAction = () => {
    if(!isLogin){
      setOpenSigniN(true)
    }
  }

  return (
    <div className={styles.menuCotainer} menuOpen={menuOpen}>
      <div className={styles.flex}>
        <div className={styles.logo}>
          <img className={styles.logoPng} src={LogoImage} alt="Logo" />
          PODVIBE{" "}
        </div>
        <div className={styles.close}>
          <CloseRounded onClick={() => {setMenuOpen(false)}} />
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

        <Link onClick={checkFavIsLoginAction} to={isLogin ? '/favourites' : ''} key={'/favourites'}  style={{ textDecoration: "none" }}>
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



      {isLogin ? (
        <div className={styles.elements} onClick={handleLogout}>
          <LogoutRounded/>
          <div className={styles.navText}>Log Out</div>
        </div>
      ) : (
        <div className={styles.elements} onClick={() => {setOpenSigniN(true)}}>
          <LoginRounded/>
          <div className={styles.navText}>Log In</div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
