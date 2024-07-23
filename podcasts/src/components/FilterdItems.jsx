import React, { useState, useEffect } from "react";
import styles from "./Podcast.module.css";
import Podcastcard from "./Podcastcard";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig"; 
import { CircularProgress } from "@mui/material";

function FilterdItems() {
  const { value } = useParams();
  const [loding, setLoding] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const[data, setData] = useState()

  const paramValue = value;

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
        console.log("ffffffffffffff",fetchedData)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (data && data.length > 0 && paramValue) {
      const filteredDataa = data.filter((item) => item.type === paramValue);
      setFilteredData(filteredDataa);
      console.log("filteredData", filteredDataa);
    }
  }, [data, paramValue]);

  return (
    <div
      className={styles.filterPage}
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ width: "100%",color:'white',fontWeight:'600',fontSize:'1.8rem' }}>{paramValue}</div>
      {loding ? (     
           <CircularProgress style={{ position:'relative',top:'50%',left:'50%'}} />
       ):(
      <div className={styles.filterdCard} style={{display:'flex', gap:'20'}}>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div >
            <Podcastcard key={index} item={item} />
          </div>
        ))
      ) : (
          <div className={styles.noDatas}>No data found</div>
        )}
      </div>
       )}
    </div>
  );
}

export default FilterdItems;
