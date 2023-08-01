import React,{useState,useContext} from 'react'
import Button from './Button';
import CommentForm from './CommentForm';
import TimeAgo from 'javascript-time-ago'
import RootCommentContext from './RootCommentContext';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Voting from './Voting';


import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addLocale(en)
TimeAgo.addLocale(ru)

const Comments = (props) => {
    const [showForm,setshowForm]=useState(false);
    const comments=props.comments.filter(comment=>props.parentId===comment.parentId);
    const rootCommentInfo=useContext(RootCommentContext);
  
    return (
    <div className={'my-2 text-buzzhive_text'}>
    {comments.map(comment=>{
      const replies=props.comments.filter(c=> c.parentId===comment.parentId)
      return(
        <div  className={'mb-2'}>
        <div className='flex mb-2'>
            <div className="bg-buzzhive_text w-10 h-10 rounded-full mr-2"/>
            <div className="leading-10 pr-2 text-lg font-sans">{comment.author}</div>
            {/* <ReactTimeAgo className="text-md leading-10  font-sans" date={comment.postedAt}/> */}
            </div>
            <div className={'border-l-2 border-buzzhive_text-darker p-3 pb-0' }
            style={{marginLeft:'18px'
            }}>
           
            <div className='pl-4 -mt-4'>
            <div>
            <ReactMarkdown remarkPlugins={[gfm]} children={comment.body} />
            </div>
            <Voting commentId={comment._id}/>
            <Button type={'button'} onClick={()=>setshowForm(comment._id)} className={"text-buzzhive_text-darker border-none py-2 pl-0 pr-0"} style={{background:"#1a1a1a"}}>Reply</Button>
            {comment._id===showForm &&(
                <CommentForm 
                parentId={comment._id}
                rootId={props.rootId}
                onSubmit={()=>{setshowForm(false);rootCommentInfo.refreshComments();}}
                showAuthor={false} onCancel={e=>setshowForm(false)}/>
            )}
            {replies.length>0 && (
              <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId}/>
            )}
            </div>
            </div>
            </div>
    )
            })}
      
    </div>
  )
}

export default Comments
