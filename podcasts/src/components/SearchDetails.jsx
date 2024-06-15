import React, { useState, useEffect } from "react";
import styles from "./Podcast.module.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function SearchDetails({ searchResults }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, [searchResults]);

  return (
    <>
      {loading ? (
        <CircularProgress style={{ position:'relative',top:'50%',left:'50%'}} />
      ) : (
        <>
          {searchResults.map((data) => (
            <Link to={`/pddetails/${data.id}`} className={styles.searchDetailCard} key={data.id}>
              <div className={styles.searchContains}>
                <div className={styles.searchDContainer}>
                  <img
                    className={styles.searchDFpodcast}
                    src={data.thumbnailURL} 
                    alt="Podcast Thumbnail"
                  />

                  <div className={styles.searchDNameContainer}>
                    <div className={styles.searchDlabel}>
                      {data.episodes && data.episodes.length > 0 ? data.episodes[0].episodeName : "Unknown Episode"}
                    </div>
                    <div className={styles.searchDUN}>
                      {data.uploderId}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </>
  );
}

export default SearchDetails;
