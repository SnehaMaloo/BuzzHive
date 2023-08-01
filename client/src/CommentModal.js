import React,{useEffect,useState} from 'react'
import PostContent from './PostContent';
import axios from 'axios';
import ClickOutHandler from 'react-clickout-handler';
import CommentForm from './CommentForm';
import Comments from './Comments';
import RootCommentContext from './RootCommentContext';
import Comment from './Comment';



const CommentModal = (props) => {
 
    const [comment,setComment]=useState([]);
    const visibleClass= props.open ? 'block' : 'hidden';

    useEffect(()=>{
      axios.get('/comments/'+props.id).then(response=>{setComment(response.data)});
    }, [props.id]);
  
      function close(){
        setComment({});
        props.onClickOut();
      }

  return (
    <div className={"w-screen h-screen fixed top-0  left-0 z-20 flex "+ visibleClass} style={{backgroundColor:'rgba(0,0,0,.8)'}}>
       <div className='block overflow-scroll w-screen'>
       <ClickOutHandler onClickOut={()=> close()}>
       
       <div className="my-4 border border-buzzhive_dark-brightest w-3/4 lg:w-1/2 bg-buzzhive_dark-brighter text-buzzhive_text p-4 self-center mx-auto rounded-md ">
         <div className="">
           <Comment comment={comment} id={props.id}/>
         </div>
       </div>
     </ClickOutHandler>
       </div> 
    </div>
  )
}

export default CommentModal;
