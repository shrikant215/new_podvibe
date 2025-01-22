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
import { useDispatch, useSelector } from 'react-redux'
import { openSnackbar, closeSnackbar} from './redux/snackbarSlice';
import axios from "axios";


function App() {
  const [menuOpen, setmenuOpen] = useState(true);
  const [uplodeOpen, setUplodeOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [favitem, setFevItems] = useState();
  const [details, setDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  const {opensi} = useSelector((state) => state.signin);
  const {open, message, severity} = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();

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
      {opensi && (  <Signin setOpenSignUp={setOpenSignUp}  /> )}
        {openSignUp && <Signup setOpenSignUp={setOpenSignUp}  />}
        
        {uplodeOpen && <div className="backdrop"></div>}
        {uplodeOpen && <Uplode setUplodeOpen={setUplodeOpen}  />}

        <div className="container">
        {openDialog && details && details.length > 0 && details[0].category === "Audio" && (
    <Audioplayer setDetails={setDetails} details={details} setOpenDialog={setOpenDialog} openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
)}

        {menuOpen && <Sidebar setmenuOpen={setmenuOpen}  setUplodeOpen={setUplodeOpen} />} 
          <div className="frame">
            <Navbar  setmenuOpen={setmenuOpen} menuOpen={menuOpen} />
            <Routes>
              <Route path="/" exact element={<Dashboard  fav={fav} />} />
              <Route path="/search" exact element={<Search />} />
              <Route path="/favourites" exact element={<Favourites favitem={favitem} />} />
              <Route path="/pddetails/:id" exact element={<PodcastDetails  handleOpenaudipalyer={handleOpenaudipalyer} setDetails={setDetails} details={details} setOpenDialog={setOpenDialog} openDialog={openDialog} />} />
              <Route path="/showPodcasts/:value" exact element={<FilterdItems favitem={favitem} />} />
            </Routes>
           <ToastMessage />
          </div>
        </div>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
