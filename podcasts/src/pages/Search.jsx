import React, { useState } from "react";
import styles from "./Pages.module.css";
import { SearchRounded } from "@mui/icons-material";
import SearchCard from "../components/SearchCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../components/firebaseConfig"; 
import SearchDetails from "../components/SearchDetails";

function Search() {
  

  const menuitems = [
    {
      name: 'Education',
      value: 'education',
      img: 'https://img.freepik.com/free-photo/book-with-green-board-background_1150-3836.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712188800&semt=sph',
      color: 'rgb(232, 86, 42)',
    },{
      name: 'Health',
      value: 'health',
      img: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
      color: 'rgb(201, 178, 171)',
    },{
      name: 'Comedy',
      value: 'comedy',
      img: 'https://cdn.wallpapersafari.com/22/23/bX6L4B.jpg',
      color: 'rgb(140, 171, 170)',
    },{
      name: 'Science',
      value: 'science',
      img: 'https://u7.uidownload.com/vector/594/113/vector-chemistry-background-experiment-process-decor-lab-tool-icons-eps-ai.jpg',
      color: 'rgb(98, 191, 98)',
    },{
      name: 'Religion',
      value: 'religion',
      img: 'https://w0.peakpx.com/wallpaper/391/892/HD-wallpaper-the-hindu-hinduism-hindu-om-religion-god.jpg',
      color: ' rgb(237, 76, 89)',
    },{
      name: 'Sport',
      value: 'sport',
      img: 'https://a-static.besthdwallpaper.com/lionel-messi-footballer-wallpaper-960x600-110307_1.jpg',
      color: 'rgb(186, 117, 56)',
    },{
      name: 'Crime',
      value: 'crime',
      img: 'https://w0.peakpx.com/wallpaper/144/159/HD-wallpaper-crime-scene-do-not-cross.jpg',
      color: 'rgb(108, 157, 173)',
    },{
      name: 'Culture',
      value: 'culture',
      img: 'https://e0.pxfuel.com/wallpapers/595/590/desktop-wallpaper-custom-tradition-of-indian-culture-indian-religion-festivals.jpg',
      color: ' rgb(222, 87, 127)',
    },{
      name: 'History',
      value: 'history',
      img: 'https://pics.craiyon.com/2023-07-13/b044595e65b741c4aa0bdcf78ac523bf.webp',
      color: 'rgb(174, 180, 181)',
    },{
      name: 'Devlopment',
      value: 'devlopment',
      img: 'https://e1.pxfuel.com/desktop-wallpaper/626/499/desktop-wallpaper-software-web-development.jpg',
      color: 'rgb(116, 208, 214)',
    },{
      name: 'News',
      value: 'news',
      img: 'https://img.freepik.com/free-vector/realistic-news-studio-background_52683-103246.jpg',
      color: ' rgb(125, 186, 60)',
    },{
      name: 'Bussiness',
      value: 'bussiness',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihAqrY2oWUV3IuPBlMfByhL4E1nIXgwb1KC-nOAI0sA&s',
      color: 'rgb(108, 75, 184)',
    },
  ]

  const [searchQuery, setSearchQuery] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState();


  const handleSearchChange = (e) => {
    const searchText = e.target.value; 
    setSearchQuery(searchText);
  
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  
    const timeout = setTimeout(() => {
      if (searchText.trim() !== '') {
        searchPodcasts(searchQuery);
        console.log("object",searchQuery) 
      } else {
        setSearchResults([]);
      }
    }, 2000);
  
    setTypingTimeout(timeout);
  };

  const searchPodcasts = async (searchText) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'podcasts'));
      const results = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("datadata",data)
        const hasMatchingEpisode = data.episodes.filter(episode => episode.episodeName.toLowerCase().includes(searchText.toLowerCase())).length > 0;
        console.log("hasMatchingEpisode",hasMatchingEpisode)
        if (hasMatchingEpisode) {
          results.push({id: doc.id, ...data});
        }
      });
      console.log("results",results)

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching podcasts:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className={styles.searchpage}>
      <div className={styles.searchBox}>
      <div className={styles.searchContainer}>
        <SearchRounded className={styles.searchsearch} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="search podcasts"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      </div>

      <div className={styles.SearchMain}>

      {searchQuery && (
            searchResults && searchResults.length > 0 ? (
              console.log("searchResultssearchResults",searchResults),
              <div className={styles.SearchDetails}>
                <SearchDetails searchResults={searchResults}  />
              </div>
            ) : (
              <div className={styles.noData}>No data found</div>
            )
      )}  

      {!searchQuery && (
        <>
         <div className={styles.Topic}>Browse All</div>
        <div className={styles.podcastss}>
          {menuitems.map((items, index) => (
              <SearchCard key={index} items={items}  />
          ))}
        </div>
        </>
      )}
       
      </div>

    </div>
  );
}

export default Search;
