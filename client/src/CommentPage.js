import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';
import CommentForm from './CommentForm';
import RootCommentContext from './RootCommentContext';
import Comment from './Comment';


const CommentPage = (props) => {

    const commentId=props.match.params.id;
    return (
    <div className='bg-buzzhive_dark py-4 px-6'>
    <div className='bg-buzzhive_dark-brighter p-3 rounded-md'>
    <Comment id={commentId}/>
    </div>
      
    </div>
  );
}

export default CommentPage;
 