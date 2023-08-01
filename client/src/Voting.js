import React from 'react'
import axios from 'axios'
import { useContext } from 'react';
import RootCommentContext from './RootCommentContext';

const Voting = (props) => {
    const rootCommentInfo=useContext(RootCommentContext);
    
    const total=(rootCommentInfo.commentsTotals && rootCommentInfo.commentsTotals[props.commentId])||0;
    const userVote=(rootCommentInfo.userVotes &&  rootCommentInfo.userVotes[props.commentId])||0;

    
    function sendVote(direction = 'up'){
        const directionNumber=direction==='up'?1:-1;
        if(directionNumber===userVote){
            direction='unvote';
        }
        const url='/vote/'+props.commentId+'/'+direction;
        axios.get(url,{withCredentials:true}).then(()=>{
            rootCommentInfo.refreshVotes();
        })
    }
    function handleVoteUp(){
        sendVote('up');
    }

    function handleVoteDown(){
        sendVote('down');
    }

    function arrowButton(directionName='up'){
        let classNames='inline-block h-5 relative top-1';
        const directionNumber=directionName==='up'?1:-1;
        if(directionNumber===userVote)
        {
            classNames+=' text-buzzhive_red';
        }else{
            classNames+= 'text-buzzhive_text-darker hover:text-white';
        }
        
        if(directionName==='up')
        {
            return (<button onClick={()=>handleVoteUp()} 
            className={classNames}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
            </button>);
        }
        else
        {
            return (
        <button onClick={()=>handleVoteDown()} 
            className={classNames}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
        </button>
            )
        }
    }

  return (
    <div className={'inline-block mr-2'}>
       {arrowButton('up')}

        <div className={'inline-block '}>{total}</div>
        
       {arrowButton('down')}
        
    </div>
  )
}

export default Voting
