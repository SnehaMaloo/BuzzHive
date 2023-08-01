function Textarea(props){
    return(
        <textarea {...props} className={"bg-buzzhive_dark-brighter text-buzzhive_text p-2 border border-buzzhive_dark-brightest rounded-md block "+props.className}/>
    );
}

export default Textarea;