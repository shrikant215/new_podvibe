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
<<<<<<< HEAD
        <div className={styles.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        searchResults.length > 0 ? (
          searchResults.map((data) => (
=======
        <CircularProgress style={{ position:'relative',top:'50%',left:'50%'}} />
      ) : (
        <>
          {searchResults.map((data) => (
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
            <Link to={`/pddetails/${data.id}`} className={styles.searchDetailCard} key={data.id}>
              <div className={styles.searchContains}>
                <div className={styles.searchDContainer}>
                  <img
                    className={styles.searchDFpodcast}
                    src={data.thumbnailURL} 
                    alt="Podcast Thumbnail"
                  />
<<<<<<< HEAD
=======

>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
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
<<<<<<< HEAD
          ))
        ) : (
          <div className={styles.noData}>No data found</div>
        )
=======
          ))}
        </>
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
      )}
    </>
  );
}

export default SearchDetails;
