import React from "react";
import styles from "./Podcast.module.css";
import { Modal } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

function Audioplayer({
  details,
  openDialog,
  handleCloseDialog,
  setOpenDialog,
}) {
  if (
    !details ||
    details.length === 0 ||
    !details[0].episodes ||
    details[0].episodes.length === 0
  ) {
    return null;
  }

  return (
    <modal
      className={styles.APmodal}
      open={openDialog}
      onClose={handleCloseDialog}
      keepMounted
    >
      <div className={styles.audioPlrContainer}>
        <div className={styles.audioPlrBox}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {details[0] && (
              <>
                <img
                  className={styles.APImg}
                  src={details[0].thumbnailURL}
                  alt="Podcast Thumbnail"
                />
                <dive className={styles.audioPlrTitle}>
                  {details[0].episodes[0].episodeName}{" "}
                </dive>
              </>
            )}
          </div>

          <div className={styles.audioPlayer}>
            {details[0] &&
              details[0].episodes &&
              details[0].episodes.length > 0 && (
                <audio controls className={styles.audio}>
                  <source
                    src={details[0].episodes[0].videoURL}
                    type="audio/mp3"
                  />
                </audio>
              )}
          </div>
          <div
            className={styles.apClose}
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            <CloseRounded />
          </div>
        </div>
      </div>
    </modal>
  );
}

export default Audioplayer;
