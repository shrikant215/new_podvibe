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
<<<<<<< HEAD
import PodcastDetails from './pages/PodcastDetails';
import FilterdItems from './components/FilterdItems';
=======

import PodcastDetails from './pages/PodcastDetails';
import FilterdItems from './components/FilterdItems';
// import { CloseRounded, TaskAltRounded } from '@mui/icons-material';
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
import ToastMessage from './components/ToastMessage';
import Audioplayer from './components/Audioplayer';


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
<<<<<<< HEAD
=======
    // console.log("fav",favitem)
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
  }


  const handleOpenaudipalyer = () => {
    setOpenDialog(true);

  }

<<<<<<< HEAD
=======

>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

<<<<<<< HEAD
=======


>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
  return (
    <div>
          <GoogleOAuthProvider>

      <BrowserRouter>
<<<<<<< HEAD
        {openSignUp && <Signup setOpenSignUp={setOpenSignUp} setOpenSigniN={setOpenSigniN} setIsLogin={setIsLogin} loginDetails={loginDetails} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />}
=======
        {openSignUp && <Signup setOpenSignUp={setOpenSignUp} setOpenSigniN={setOpenSigniN} />}
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
        {openSigniN && (
          <Signin setOpenSigniN={setOpenSigniN} setOpenSignUp={setOpenSignUp} setIsLogin={setIsLogin} loginDetails={loginDetails} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
        )}
        {uplodeOpen && <div className="backdrop"></div>}
        {uplodeOpen && <Uplode setUplodeOpen={setUplodeOpen} loginUser={loginUser} />}

<<<<<<< HEAD
=======
        {/* details.category === 'Audio' && */}
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
        <div className="container">
        {openDialog && details && details.length > 0 && details[0].category === "Audio" && (
    <Audioplayer setDetails={setDetails} details={details} setOpenDialog={setOpenDialog} openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
)}
<<<<<<< HEAD

        {menuOpen && <Sidebar setmenuOpen={setmenuOpen}  setUplodeOpen={setUplodeOpen} isLogin={isLogin} setIsLogin={setIsLogin} setOpenSigniN={setOpenSigniN} />} 
          <div className="frame">
            <Navbar setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} setmenuOpen={setmenuOpen} menuOpen={menuOpen} setOpenSigniN={setOpenSigniN} isLogin={isLogin} loginUser={loginUser} setIsLogin={setIsLogin} />
=======
        {menuOpen && <Sidebar setmenuOpen={setmenuOpen}  setUplodeOpen={setUplodeOpen} isLogin={isLogin} setIsLogin={setIsLogin} setOpenSigniN={setOpenSigniN} />} 

          <div className="frame">
            <Navbar setmenuOpen={setmenuOpen} menuOpen={menuOpen} setOpenSigniN={setOpenSigniN} isLogin={isLogin} loginUser={loginUser} />
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
            <Routes>
              <Route path="/" exact element={<Dashboard loginUser={loginUser} fav={fav} />} />
              <Route path="/search" exact element={<Search />} />
              <Route path="/favourites" exact element={<Favourites favitem={favitem} />} />
              <Route path="/pddetails/:id" exact element={<PodcastDetails handleOpenaudipalyer={handleOpenaudipalyer} setDetails={setDetails} details={details} setOpenDialog={setOpenDialog} openDialog={openDialog} />} />
              <Route path="/showPodcasts/:value" exact element={<FilterdItems favitem={favitem} />} />
            </Routes>
<<<<<<< HEAD
           <ToastMessage snackbarOpen={snackbarOpen} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen} />
          </div>
        </div>
      </BrowserRouter>
      </GoogleOAuthProvider>
=======

           <ToastMessage snackbarOpen={snackbarOpen} snackbarMessage={snackbarMessage} setSnackbarOpen={setSnackbarOpen} />
            
          </div>
          
        </div>
      </BrowserRouter>
      </GoogleOAuthProvider>

>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
    </div>
  );
}

export default App;
