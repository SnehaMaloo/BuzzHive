import React from 'react'
import ClickOutHandler from 'react-clickout-handler'

const Popup = ({children,open,onClickOut}) => {
    const visibleClass=open?'block':'hidden';
  
    return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex "+ visibleClass} style={{backgroundColor:'rgba(0,0,0,.8)'}}>
        <ClickOutHandler onClickOut={()=>{onClickOut()}}>
            <div className="border border-buzzhive_dark-brightest w-3/4  md:w-2/4 bg-buzzhive_dark p-5 text-buzzhive_text self-center mx-auto rounded-md ">
           {children}
            </div>
            </ClickOutHandler>
    </div> 
 )
}

export default Popup
