import React, { useEffect, useState } from "react";
import styles from "./Pages.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Avatar, Dialog, Modal } from "@mui/material";
import {
  CloseRounded,
  PlayArrowRounded,
  PlayCircleRounded,
} from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";

function PodcastDetails({
  details,
  setDetails,
  openDialog,
  setOpenDialog,
  handleOpenaudipalyer,
  userData
}) {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "podcasts"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });

        const filteredData = fetchedData.filter((item) => item.id === id);
        setDetails(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleOpenaudipalyer();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className={styles.pdContainer}>
      <div className={styles.pdPodDetails}>
        {details && details.length > 0 && (
          <div>
            <div className={styles.pdBox} key={details[0].id}>
              <img
                className={styles.pdImg}
                src={details[0].thumbnailURL}
                alt="Podcast Thumbnail"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={styles.pdtitle}>{details[0].name}</div>
                <div className={styles.pdDic}>{details[0].desc}</div>

                <div className={styles.pdFooter}>
                  <div className={styles.pdTags}>{details[0].tags}</div>
                  <div style={{ display: "flex" }}>
                  <Avatar
                    style={{ width: "26px", height: "26px" }}
                    src={details[0].uploderId.image}
                  >
                    {typeof details[0].uploderId === "object" && details[0].uploderId.displayName 
                      ? details[0].uploderId.displayName.charAt(0).toUpperCase() 
                      : "U"} {/* Default fallback character */}
                  </Avatar>  
                  <div className={styles.creatorName}>{details[0].uploderId.displayName}</div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginLeft: "20px",
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        top: "-12px",
                      }}
                    >
                      <div style={{ fontSize: "12px" }}> 234 views</div>
                      <div style={{ fontSize: "12px" }}> 2 months ago</div>
                      <PlayCircleRounded
                        style={{ height: "50px", width: "60px" }}
                        className={styles.pdPlayicon}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                color: "white",
                marginTop: "10px",
              }}
            >
              All Episodes
            </div>

            {details &&
              details.length > 0 &&
              details[0].episodes &&
              details[0].episodes.length > 0 && (
                <div
                  className={styles.episodeContainer}
                  onClick={handleOpenDialog}
                >
                  <div className={styles.episodebox}>
                    <img
                      className={styles.epImg}
                      src={details[0].thumbnailURL}
                      alt="Podcast Thumbnail"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        {details[0].episodes[0].episodeName}
                      </div>
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "gray",
                        }}
                      >
                        {details[0].episodes[0].episodeDisc}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      {details &&
        details.length > 0 &&
        details[0].episodes &&
        details[0].category === "Video" &&
        details[0].episodes.length > 0 && (
          <Modal open={openDialog} onClose={handleCloseDialog}>
            
            <div className={styles.videoConatiner}>
           
              <div className={styles.videocontainer}>
              
                <div className={styles.videoWrapper}>
                <CloseRounded
                onClick={handleCloseDialog}
                style={{display:'flex',justifySelf:'end',alignSelf:'end',marginRight:"10px"}}
              />
                  <video controls className={styles.video}>
                    <source
                      src={
                        details &&
                        details.length > 0 &&
                        details[0].category === "Video" &&
                        details[0].episodes &&
                        details[0].episodes.length > 0 &&
                        details[0].episodes[0].videoURL
                      }
                      type="video/mp4"
                    />
                  </video>
                  <div
                    style={{
                      margin: "15px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      {details[0].episodes[0].episodeName}
                    </div>
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "gray",
                        marginTop: "10px",
                      }}
                    >
                      {details[0].episodes[0].episodeDisc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
    </div>
  );
}

export default PodcastDetails;
