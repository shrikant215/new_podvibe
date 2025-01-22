import React, { useEffect, useState, useCallback } from 'react';
import styles from './Pages.module.css';
import { Link } from 'react-router-dom';
import Podcastcard from '../components/Podcastcard';
import axios from 'axios';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig"; 
import { CircularProgress } from "@mui/material";

function Dashbord({loginUser, fav}) {
  const [data, setData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [favorites, setFavorites] = useState([]);


  // useEffect(() => {
    const fetchData = useCallback( async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "podcasts"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });
        setData(fetchedData);
        fav(fetchedData)
        setLoding(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },[]);

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // console.log("data",data)


  return (
    <div className={styles.DashbordMain}>
      {loding ? (     
           <CircularProgress style={{ position:'relative',top:'50%',left:'50%'}} />
       ):(
<>
      <div className={styles.filterContainer}>
        <div className={styles.Topic}>
          Most Popular
          <Link to="#" style={{ textDecoration: 'none' }}>
            <span>Show All</span>
          </Link>
        </div>
        <div className={styles.podcasts}>
          {data.map((item, index) => (
            <Podcastcard  key={index} item={item} loginUser={loginUser} favorites={favorites} setFavorites={setFavorites} />
          ))}
        </div>
        
      </div>
      <div className={styles.filterContainer}>
      <div className={styles.Topic}>
      Emotional
        <Link to="#" style={{ textDecoration: 'none' }}>
          <span>Show All</span>
        </Link>
      </div>
      <div className={styles.podcasts}>
        {data.filter((ele) => ele.type === "emotional").map((item, index) => (
          <Podcastcard  key={index} item={item} loginUser={loginUser} favorites={favorites} setFavorites={setFavorites} />
        ))}
      </div>
      
    </div>
    </>
      )}

    </div>
  );
}

export default Dashbord;
