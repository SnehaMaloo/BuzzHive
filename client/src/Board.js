import React from 'react'
import BoardHeader from './BoardHeader';
import PostForm from './PostForm';
import PostsListing from './PostsListing';
import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import { CommunityContext } from './CommunityContext';


const Board = () => {
  const {community:communityFromUrl}=useParams();
  const {setCommunity}=useContext(CommunityContext);
  
  useEffect(()=>{
  setCommunity(communityFromUrl);
  },[communityFromUrl]);

  return (
    <div>
      <BoardHeader/>
      <PostForm/>
      <PostsListing/>
    </div>
  )
}

export default Board;
