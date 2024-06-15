import React, { useState, useEffect } from "react";
import styles from "./Podcast.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { blue, green, orange, purple } from "@mui/material/colors";

function Podcastcard({ item, favorites, setFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const getRandomColor = () => {
    const colors = [blue[500], green[500], orange[500], purple[500]];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    const favoriteItemId = item.id;
    const storedFavorite = localStorage.getItem(favoriteItemId);
    setIsFavorite(storedFavorite === "true");
  }, [item.id]);

  const toggleFavorite = (event) => {
    event.preventDefault();
    console.log("iddd", `${item.id}`);
    setIsFavorite(!isFavorite);

    const favoriteItemId = item.id;

    const index = favorites.indexOf(favoriteItemId);

    if (!isFavorite && index === -1) {
      setFavorites([...favorites, favoriteItemId]);
      localStorage.setItem(favoriteItemId, "true");
    } else if (isFavorite && index !== -1) {
      const updatedFavorites = favorites.filter(
        (favId) => favId !== favoriteItemId
      );
      setFavorites(updatedFavorites);
      localStorage.removeItem(favoriteItemId);
    }
  };

  const avatarColor = getRandomColor();
  return (
    <div className={styles.podContainer}>
      <Link to={`/pddetails/${item.id}`} className={styles.card}>
        <div className={styles.Top}>
          <FavoriteIcon
            className={styles.favicon}
            style={{
              position: "relative",
              width: "16px",
              height: "16px",
              color: isFavorite ? "red" : "inherit",
              fill: isFavorite ? "red" : "currentColor", 
            }}
            onClick={(event) => toggleFavorite(event)}
          />

          <img
            className={styles.img}
            src={item.thumbnailURL}
            alt="Podcast Thumbnail"
          />
        </div>
        <div className={styles.cardInformation}>
          <div className={styles.mainInfo}>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.dicription}>{item.desc}</div>

            <div className={styles.creatorInfo}>
              <div className={styles.creater}>
                {item.uploderId && (
                  <Avatar
                    style={{
                      width: "26px",
                      height: "26px",
                      backgroundColor: avatarColor,
                    }}
                  >
                    {item.uploderId.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <div className={styles.creatorName}>{item.uploderId}</div>
              </div>
              {/* <div className={styles.view}> 12 Views</div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Podcastcard;
