import React from 'react'
import {useContext} from 'react';
import PostFormModalContext from './PostFormModalContext';
import TimeAgo from 'javascript-time-ago'
import  ReactMarkdown  from 'react-markdown';
import gfm from 'remark-gfm';
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addLocale(en)
TimeAgo.addLocale(ru)

const PostContent = (props) => {
  const modalContext=useContext(PostFormModalContext);
  return (
      <div>
       <h5 className='text-buzzhive_text-darker text-sm mb-1'>Posted by u/{props.author} {/*<ReactTimeAgo date={props.postedAt} locale="en-US"/>*/}</h5>
          <h2 className='text-xl mb-3'>{props.title}</h2>
          <div className='text-sm leading-6'>
            <ReactMarkdown plugins={{gfm}} children={props.body}/>
          </div>
    </div>
  )
}

export default PostContent
