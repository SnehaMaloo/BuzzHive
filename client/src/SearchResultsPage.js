import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Post from './Post';
import {Link} from 'react-router-dom';

const SearchResultsPage = (props) => {
    const {text}=props.match.params;
    const [comments, setComments] = useState([]);
    const [communities,setCommunities]=useState([]);
    
    useEffect(()=>{
        axios.get('/search?phrase='+text,{withCredentials:true}).then(response=> {setComments(
          response.data.comments);
        setCommunities(response.data.communities);
        });
    }, []);
  return (
    <div className='bg-buzzhive_dark'>
      {communities.map(community=>(
        <Link
        className={'block bg-buzzhive_dark-brighter p-3 mx-6 border-2 border-buzzhive_border text-buzzhive_text rounded mb-2 hover:border-white'}
        to={'/h/'+community.name}>h/{community.name}</Link>
      ))}
          {comments.map(comment=>(
            <Post key={comment._id} {...comment} isListing={true}/>
          ))}
        </div>
  );
}

export default SearchResultsPage;
