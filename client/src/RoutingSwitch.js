import React,{useState, useEffect} from 'react'
import { Switch,Route,useLocation, useHistory} from 'react-router-dom';
import Board from './Board'
import CommentPage from './CommentPage';
import CommentModal from './CommentModal';
import SearchResultsPage from './SearchResultsPage';


const RoutingSwitch = () => {
   const [commentId,setCommentId]=useState(null);
    const location=useLocation();
    const history=useHistory();

    if(location?.state?.commentId){
        if(location?.state?.source){
            location.pathname='/h/'+location.state.source;
        }
        else
        {
            location.pathname='/';
        }
        if(!commentId)
        {
        setCommentId(location.state.commentId);
        }
    }

    function close(){
        history.push({pathname:location.pathname});
        setCommentId(null);
    }
    


  return (
    <div>
    {
        commentId && (
            <CommentModal id={commentId} open={!!commentId} onClickOut={()=>close()}/>
        )
    }
      <Switch location={location}>
          <Route exact path='/' component={Board} />
          <Route exact path='/h/:community' component={Board} />
          <Route exact path='/comments/:id' component={CommentPage} />  
            <Route exact path='/search/:text' component={SearchResultsPage}/>
        </Switch>
    </div>
  )
}

export default RoutingSwitch
