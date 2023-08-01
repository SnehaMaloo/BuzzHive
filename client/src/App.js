import './style.css';
import Header from './header';
import BoardHeader from './BoardHeader';
import PostForm from './PostForm';
import AuthModal from './AuthModal';
import AuthModalcontext from './AuthModalcontext.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import userContext from './userContext';
import Post from './Post';
import {Switch, Route,BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import PostsListing from './PostsListing';
import Board from './Board';
import CommentPage from './CommentPage';
import Routing from './Routing';
import PostFormModal from './PostFormModal';
import PostFormModalContext from './PostFormModalContext';
import RedirectContext from './RedirectContext';
import { CommunityContextProvider } from './CommunityContext';


function App() {
  const[showAuthModal, setShowAuthModal]=useState(false);
  const [showPostFormModal,setShowPostFormModal]=useState(false);
  const[user, setUser] = useState({});
  const [redirect,setRedirect]=useState(false);
  
 useEffect(()=>{
    axios.get('/user', {withCredentials:true})
    .then(response=> setUser(response.data));
  }, []);
  function logout(){
    axios.post('/logout',{}, {withCredentials:true})
    .then(() => setUser({}));
  }

  return (
    <AuthModalcontext.Provider value={{show:showAuthModal, setShow:setShowAuthModal}}>
      <PostFormModalContext.Provider value={{show:showPostFormModal,setShow:setShowPostFormModal}}>
        <CommunityContextProvider>
        <userContext.Provider value={{...user, logout, setUser}}>
          <RedirectContext.Provider value={{redirect,setRedirect}}>
          <Routing/>
          </RedirectContext.Provider>
    </userContext.Provider>
    </CommunityContextProvider>
    </PostFormModalContext.Provider>
    </AuthModalcontext.Provider>
  );
}

export default App;
