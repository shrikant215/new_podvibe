import React, { useState, useEffect } from "react";
import styles from "./Pages.module.css";
import Podcastcard from "../components/Podcastcard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig"; 
import { CircularProgress } from "@mui/material";

function Favourites() {
  const [favorites, setFavorites] = useState([]);
  const [loding, setLoding] = useState(true);
  const[data, setData] =useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "podcasts"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        setData(fetchedData);
        setLoding(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // Ensure favitem is not undefined before filtering it
    if (data) {
      const storedFavorites = Object.keys(localStorage).filter(
        (key) => localStorage.getItem(key) === "true"
      );
      setFavorites(storedFavorites);
    }
  }, [data]);

  // Ensure data is not undefined before filtering it
  const favoriteItems =
    data && favorites.length > 0
      ? data.filter((item) => favorites.includes(item.id))
      : [];

  return (
    <div className={styles.DashbordMain}>
      <div className={styles.Topic}>Favourites</div>
      {loding ? (     
           <CircularProgress style={{ position:'relative',top:'50%',left:'50%'}} />
       ):(
      <div className={styles.favContainer}>
<<<<<<< HEAD
        {favoriteItems.length > 0 ? (
 favoriteItems.map((item) => (
  <Podcastcard
    key={item.id}
    item={item}
    favorites={favorites}
    setFavorites={setFavorites}
  />
))
        ) : (
          <p className={styles.pStyle}>No data found</p>
        )
       }
=======
        {favoriteItems.map((item) => (
          <Podcastcard
            key={item.id}
            item={item}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
      </div>
       )}
    </div>
  );
}

export default Favourites;
