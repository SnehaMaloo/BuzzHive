import React, {useContext}from 'react'
import {Link} from 'react-router-dom';
import PostContent from './PostContent';
import { CommunityContext } from './CommunityContext';

const Post =(props) => {
  const{community}=useContext(CommunityContext);
  
  let postClasses='block border rounded-md'+(props.open?"":"hover:border-buzzhive_text  cursor-pointer")
  if(props.isListing){
    postClasses+=' bg-buzzhive_dark-brighter p-3 mx-6 border-2 border-buzzhive_border';
  }
  else{
    postClasses+=" border-none";
  }

  return (
    <div className='text-buzzhive_text pb-4'>
        {props.open && (
          <div className={postClasses}>
            <PostContent {...props}/>
          </div>
        )}
        {!props.open && (
        <Link to={{pathname:`/comments/`+(props.rootId || props._id),state:{commentId:(props.rootId||props._id),source:community}}} className={postClasses}>
          <PostContent {...props}/>
        </Link>
        )}
      </div>
  )
}

export default Post;
