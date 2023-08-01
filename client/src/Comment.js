import React,{useEffect,useState} from 'react';
import Comments from './Comments';
import RootCommentContext from './RootCommentContext';
import CommentForm from './CommentForm';
import axios from 'axios';
import Post from './Post';


const Comment = (props) => {
    const [comment,setComment]=useState([]);
    const [comments,setComments]=useState([]);
    const [commentsTotals,setCommentsTotals]=useState([]);
    const [userVotes,setUserVotes]=useState(null);

    function refreshComments(){
      axios.get('/comments/root/'+props.id).then(response=>{
        setComments(response.data);
        refreshVotes();
  
      })
    }

    function refreshVotes(){
      const commentsIds=[comment._id, ...comments.map(c=>c._id)];
      axios.post('/votes',{commentsIds},{withCredentials:true}).then(response=>{
        setCommentsTotals(response.data.commentsTotals)
        console.log(response.data);
        setUserVotes(response.data.userVotes);
      })
    }
    useEffect(()=>{
      if(props.comment){
        setComment(props.comment);
      }
      else
      {
        axios.get('/comments/'+props.id).then(response=>{setComment(response.data)});}
        refreshComments();
      }, [props.id,props.comment]);

      useEffect(()=>{
        refreshVotes();
      },[comments.length]);
  
  return (
    <>
    {comment && (
        <Post {...comment} open={true}/>)}
        {!!comment && comment._id &&(
              <>
              <hr className='border-buzzhive_border my-4'/>
          <CommentForm rootId={comment._id} onSubmit={()=>refreshComments()} parentId={comment._id} showAuthor={true}/>
          <hr className='border-buzzhive_border my-4'/>
              <RootCommentContext.Provider value={{refreshComments, commentsTotals,userVotes,refreshVotes}}>
              <Comments parentId={comment._id} comments={comments} rootId={comment._id}/>
              </RootCommentContext.Provider>
              </>  
        )}
    </>
  )
}

export default Comment
