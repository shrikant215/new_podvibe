import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashbord';
import Signup from './components/Signup';
import Search from './pages/Search';
import Favourites from './pages/Favourites';
import Uplode from './components/Uplode';
import Signin from './components/Signin';
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import PodcastDetails from './pages/PodcastDetails';
import FilterdItems from './components/FilterdItems';
import ToastMessage from './components/ToastMessage';
import Audioplayer from './components/Audioplayer';
import axios from "axios";


function App() {
  const [menuOpen, setmenuOpen] = useState(true);
  const [uplodeOpen, setUplodeOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSigniN, setOpenSigniN] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('userId'));
  const [loginUser, setLoginUser] = useState('');
  const [favitem, setFevItems] = useState();
  const [details, setDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 

  const [userData, setUserdata] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;


  const fetchUserData = async () => {
    try {
      console.log("jjjjjjjjjjjjjjjjjjjj",userData)
      const response = await axios.get(`${apiUrl}/sigin/sucess`, { withCredentials: true });
      console.log("user",response.data.user);
      setUserdata(response.data.user);
      setIsLogin(true)
    } catch (err) { 
      console.error('Error fetching user data:', err);
    }
  };
  

  useEffect(() => {
    fetchUserData()
  }, []);


  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setLoginUser(storedUserName);
    }
  }, []);

  const loginDetails = (name) => {
    setLoginUser(name);
  };

  const fav = (allItems) => {
    setFevItems(allItems)
  }


  const handleOpenaudipalyer = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
          <GoogleOAuthProvider>

      <BrowserRouter>
        {openSignUp && <Signup setOpenSignUp={setOpenSignUp} setOpenSigniN={setOpenSigniN} setIsLogin={setIsLogin} loginDetails={loginDetails} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />}
        {openSigniN && (
          <Signin setOpenSigniN={setOpenSigniN} setOpenSignUp={setOpenSignUp} setIsLogin={setIsLogin} loginDetails={loginDetails} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
        )}
        {uplodeOpen && <div className="backdrop"></div>}
        {uplodeOpen && <Uplode setUplodeOpen={setUplodeOpen} loginUser={loginUser} userData={userData}  />}

        <div className="container">
        {openDialog && details && details.length > 0 && details[0].category === "Audio" && (
    <Audioplayer setDetails={setDetails} details={details} setOpenDialog={setOpenDialog} openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
)}

        {menuOpen && <Sidebar setmenuOpen={setmenuOpen}  setUplodeOpen={setUplodeOpen} isLogin={isLogin} setIsLogin={setIsLogin} setOpenSigniN={setOpenSigniN} />} 
          <div className="frame">
            <Navbar userData={userData}  setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} setmenuOpen={setmenuOpen} menuOpen={menuOpen} setOpenSigniN={setOpenSigniN} isLogin={isLogin} loginUser={loginUser} setIsLogin={setIsLogin} />
            <Routes>
              <Route path="/" exact element={<Dashboard loginUser={loginUser} fav={fav} />} />
              <Route path="/search" exact element={<Search />} />
              <Route path="/favourites" exact element={<Favourites favitem={favitem} />} />
              <Route path="/pddetails/:id" exact element={<PodcastDetails userData={userData} handleOpenaudipalyer={handleOpenaudipalyer} setDetails={setDetails} details={details} setOpenDialog={setOpenDialog} openDialog={openDialog} />} />
              <Route path="/showPodcasts/:value" exact element={<FilterdItems favitem={favitem} />} />
            </Routes>
           <ToastMessage snackbarOpen={snackbarOpen} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen} />
          </div>
        </div>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
