import React from 'react'
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card=styled.div`
    height:150px;
    width:150px;
    padding:1rem;
    border-radius:0.6rem;
    @media (max-width: 600px) {
<<<<<<< HEAD
      height: 150px;
      width: 250px;
=======
      height: 100px;
      width: 100px;
>>>>>>> 178213a7739d2e6de6b1ffee80a5a6eede47362d
    }
`
const PodcastName=styled.div`
    color: white;
    margin-top:10px;
    font-weight:600;
    font-size:1.4rem;
    align-item: center;
    display: flex;
    @media (max-width: 600px) {
      font-size:1rem;

    }
    `

function SearchCard({items}) {



  return (
    <Link to={`/showPodcasts/${items.value}`} style={{textDecoration:'none'}}>
     <Card style={{ background: items.color, cursor:'pointer' }} >
        <Avatar
          src={items.img}
          alt='eminem picture'
          sx={{width:"100px",height:"100px"}}
          /> 
          <PodcastName>
            {items.name}
          </PodcastName>
    </Card>
    </Link>
  )
}

export default SearchCard;