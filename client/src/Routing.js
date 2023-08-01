import React, {useContext,useEffect} from 'react';
import {BrowserRouter as Router ,Redirect} from 'react-router-dom';
import Header from './header';
import RoutingSwitch from './RoutingSwitch';
import PostFormModal from './PostFormModal';
import AuthModal from './AuthModal';
import RedirectContext from './RedirectContext';
import CommunityFormModal from './CommunityFormModal';

const Routing = () => {
  
  const {redirect,setRedirect}=useContext(RedirectContext);
  useEffect(()=>{
    if(redirect){
      setRedirect(false);
    }
  },[redirect])

  return (
      <Router>
      {redirect && (
        <Redirect to={redirect}/>
      )}
      {!redirect &&(
        <>
        <Header />
        <RoutingSwitch/>
        <PostFormModal/>
        <CommunityFormModal/>
        <AuthModal />
        </>
      )}
      </Router>
  )
}

export default Routing
