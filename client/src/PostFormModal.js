import React from 'react';
import ClickOutHandler from 'react-clickout-handler';
import { Redirect } from 'react-router-dom';
import { useState, useContext } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import PostFormModalContext from './PostFormModalContext';
import axios from 'axios';
import AuthModalcontext from './AuthModalcontext';
import { CommunityContext } from './CommunityContext';



const PostFormModal = () => {
    const modalContext = useContext(PostFormModalContext);
    const authModalContext=useContext(AuthModalcontext);
    const {community}=useContext(CommunityContext);
    const visibleClass = modalContext.show ? 'block': 'hidden';

    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [newPostId, setNewPostId] = useState('');
    
    function createPost(){
        const data={title,body,community};
        axios.post('/comments',data,{withCredentials:true}).then(response=>{ 
            setNewPostId(response.data._id);
        })
        .catch(err=>{
            if(err.response.status===401){
                authModalContext.setShow('login');
            }
        })

    }
    
if(newPostId){
    return(
        <Redirect to={'/comments/'+newPostId} />); 
}

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex "+ visibleClass} style={{backgroundColor:'rgba(0,0,0,.8)'}}>
        <ClickOutHandler onClickOut={()=>{/*modalContext.setShow(false)}}*/}}>
            <div className="border border-buzzhive_dark-brightest w-3/4  md:w-2/4 bg-buzzhive_dark p-5 text-buzzhive_text self-center mx-auto rounded-md ">
                <h1 className='text-2xl mb-5'>Create a Post</h1>
                <Input className={'w-full mb-3'} placeholder={'Title'} onChange={e=>setTitle(e.target.value)} value={title}/>
                <Textarea className={'w-full mb-3'} placeholder={'Text (required)'} onChange={e=>setBody(e.target.value)} value={body}/>
                <div className={'text-right'}>
                    <Button  onClick={()=>modalContext.setShow(false)} outline='true' className={'px-4 py-2 mr-3'}>Cancel</Button>
                    <Button onClick={()=>createPost()} className={'px-4 py-2'}>POST</Button>
                </div>

            </div>
        </ClickOutHandler>
    </div>
  )
}

export default PostFormModal;