import React, { useState } from "react";
import styles from "./Typescard.module.css";
import { CloseRounded, CloudUploadRounded } from "@mui/icons-material";
import { DialogTitle, DialogContent, Modal } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { initializeApp } from "firebase/app"; // Import initializeApp from 'firebase/app'
import "firebase/storage"; // Import storage module separately

import firebaseConfig from "./firebaseConfig";
// Update import statements for Firestore functions
import { collection, addDoc } from "firebase/firestore"; // Assuming Firestore is imported from '@firebase/firestore' in firebaseConfig
import { db } from "./firebaseConfig"; // Assuming `db` is exported from your firebaseConfig file
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

initializeApp(firebaseConfig);

function Upload({ setUplodeOpen, loginUser }) {
  const [selectedTumbnailFile, setSelectedTumbnailFile] = useState(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [podcastName, setPodcastName] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [tags, setTags] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("Audio");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [episodeName, setEpisodeName] = useState("");
  const [episodeDesc, setEpisodeSesc] = useState("");
  const [addEpisode, setAddEpisode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleTubnailFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedTumbnailFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Create a preview image URL
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideoFile(file);
    console.log("video file", file);
  };

  const handlePodcastNameChange = (event) => {
    setPodcastName(event.target.value);
  };

  const handlePodcastDescriptionChange = (event) => {
    setPodcastDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleEpisodeNameeChange = (event) => {
    setEpisodeName(event.target.value);
  };

  const handleEpisodeDescChange = (event) => {
    setEpisodeSesc(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // Upload video file
    const videoStorageRef = ref(
      getStorage(),
      "path/to/upload/" + selectedVideoFile.name
    );
    const videoUploadTask = uploadBytesResumable(
      videoStorageRef,
      selectedVideoFile
    );
  
    // Upload thumbnail image
    const thumbnailStorageRef = ref(
      getStorage(),
      "path/to/upload/thumbnails/" + selectedTumbnailFile.name
    );
    const thumbnailUploadTask = uploadBytesResumable(
      thumbnailStorageRef,
      selectedTumbnailFile
    );
  
    // Log upload progress for video file
    videoUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Video upload progress:", progress.toFixed(2) + "%");
      },
      (error) => {
        console.error("Error uploading video file:", error);
        setLoading(false);
      }
    );
  
    // Log upload progress for thumbnail image
    thumbnailUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Thumbnail upload progress:", progress.toFixed(2) + "%");
      },
      (error) => {
        console.error("Error uploading thumbnail image:", error);
        setLoading(false);
      }
    );
  
    // Wait for both uploads to complete
    try {
      await Promise.all([videoUploadTask, thumbnailUploadTask]);
  
      // Once uploads are completed, get download URLs
      const videoDownloadURL = await getDownloadURL(
        videoUploadTask.snapshot.ref
      );
      const thumbnailDownloadURL = await getDownloadURL(
        thumbnailUploadTask.snapshot.ref
      );
  
      console.log("Video file available at", videoDownloadURL);
      console.log("Thumbnail image available at", thumbnailDownloadURL);
  
      const podcastData = {
        uploderId: loginUser,
        name: podcastName,
        desc: podcastDescription,
        tags: tags,
        category: selectedOption1,
        type: selectedOption2,
        thumbnailURL: thumbnailDownloadURL,
        episodes: [
          {
            episodeName: episodeName,
            episodeDisc: episodeDesc,
            videoURL: videoDownloadURL,
          },
        ],
      };
  
      await addDoc(collection(db, "podcasts"), podcastData);
  
      setLoading(false);
      setUplodeOpen(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
    }
  };
  

  const handleClose = () => {
    setUplodeOpen(false);
  };

  const areInputsFilled = () => {
    return (
      selectedTumbnailFile !== null &&
      podcastName.trim() !== "" &&
      podcastDescription.trim() !== "" &&
      tags.trim() !== ""
    );
  };

  const areEpisodeInputsFilled = () => {
    return (
      videoUrl !== null &&
      episodeName.trim() !== "" &&
      episodeDesc.trim() !== ""
    );
  };

  return (
    <Modal className={styles.modalFocus} open={true} onClose={handleClose}>
      {!addEpisode ? (
        <div className={styles.uplodewindo}>
          <div className={styles.customDialog}>
            <DialogTitle disableTypography className={styles.titleAndClose}>
              <div className={styles.uplodetitle}>Upload Podcast</div>
              <div className={styles.closeIcon} onClick={handleClose}>
                <CloseRounded />
              </div>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Podcast Details:
                  </div>
                  <div className={styles.UploadContainer}>
                    <div className={styles.uplodefiletitle}>
                      <div className={styles.CloudUploadRounded}>
                        <CloudUploadRounded style={{ fontSize: "35px" }} />
                      </div>
                      <div style={{ fontWeight: "400" }}>
                        Click here to upload thumbnail
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>or</div>
                        <div className={styles.BrowseImage}>
                          <label
                            style={{ cursor: "pointer", fontWeight: "500" }}
                          >
                            Browse Image
                            <input
                              type="file"
                              className={styles.Uplodefile}
                              onChange={handleTubnailFileChange}
                              fullWidth
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    {previewImage && (
                      <div className={styles.imagePreviewContainer}>
                        <img
                          src={previewImage}
                          alt="Preview"
                          className={styles.imagePreview}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <div className={styles.uplodeName}>
                    <input
                      className={styles.NameInput}
                      placeholder="Podcast Name"
                      value={podcastName}
                      onChange={handlePodcastNameChange}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <div className={styles.uplodeDisc}>
                    <textarea
                      className={styles.DiscInput}
                      placeholder="Podcast Discription"
                      value={podcastDescription}
                      onChange={handlePodcastDescriptionChange}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <div className={styles.uplodeTag}>
                    <textarea
                      className={styles.tagInput}
                      placeholder="Tags.."
                      value={tags}
                      onChange={handleTagsChange}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className={styles.optionsContainer}
                    style={{ marginBottom: "10px" }}
                  >
                    <select
                      className={styles.optionsInput}
                      value={selectedOption1}
                      onChange={handleOption1Change}
                    >
                      <option value="Audio">Audio</option>
                      <option value="Video">Video</option>
                    </select>
                  </div>

                  <div
                    className={styles.optionsContainer}
                    style={{ marginBottom: "10px" }}
                  >
                    <select
                      className={styles.optionsInput}
                      value={selectedOption2}
                      onChange={handleOption2Change}
                      placeholder="select type"
                    >
                      <option value="education">education</option>
                      <option value="health">health</option>
                      <option value="comedy">comedy</option>
                      <option value="science">science</option>
                      <option value="religion">religion</option>
                      <option value="sport">sport</option>
                      <option value="crime">crime</option>
                    </select>
                  </div>
                </div>

                <div className={styles.button}>
                  <button
                    className={styles.buttonInput}
                    type="button"
                    onClick={() => setAddEpisode(true)}
                    disabled={!areInputsFilled()}
                    style={{ backgroundColor: areInputsFilled() ? "#be1adb" : "" }}
                  >
                    Next
                  </button>
                </div>
              </form>
            </DialogContent>
          </div>
        </div>
      ) : (
        <div className={styles.uplodewindo}>
          <div className={styles.customDialog}>
            <DialogTitle disableTypography className={styles.titleAndClose}>
              <div className={styles.uplodetitle}>Upload Podcast</div>
              <div className={styles.closeIcon} onClick={handleClose}>
                <CloseRounded />
              </div>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Podcast Details:
                  </div>
                  <div className={styles.UploadContainer}>
                    <div className={styles.uplodefiletitle}>
                      <div className={styles.CloudUploadRounded}>
                        <CloudUploadRounded style={{ fontSize: "35px" }} />
                      </div>
                      <div style={{ fontWeight: "400" }}>
                        select Audio/Video
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>or</div>
                        <div className={styles.BrowseImage}>
                          {!loading && (
                            <label
                              style={{ cursor: "pointer", fontWeight: "500" }}
                            >
                              Browse file
                              <input
                                type="file"
                                className={styles.Uplodefile}
                                onChange={handleVideoFileChange}
                                fullWidth
                              />
                            </label>
                          )}
                        </div>
                        {loading && <CircularProgress />}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <div className={styles.uplodeName}>
                    <input
                      className={styles.NameInput}
                      placeholder="Episode Name"
                      value={episodeName}
                      onChange={handleEpisodeNameeChange}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <div className={styles.uplodeDisc}>
                    <textarea
                      className={styles.DiscInput}
                      placeholder="Episode Discription"
                      value={episodeDesc}
                      onChange={handleEpisodeDescChange}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></div>

                <div className={styles.button}>
                  <button
                    className={styles.buttonInput}
                    type="button"
                    disabled={!areEpisodeInputsFilled()}
                    style={{
                      backgroundColor: areEpisodeInputsFilled() ? "#be1adb" : "",
                    }}
                  >
                    Add Episode
                  </button>
                  <button
                    className={styles.buttonInput}
                    type="submit"
                    disabled={!areEpisodeInputsFilled()}
                    style={{
                      backgroundColor: areEpisodeInputsFilled() ? "#be1adb" : "",
                    }}
                  >
                    create
                  </button>
                </div>
              </form>
            </DialogContent>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default Upload;
