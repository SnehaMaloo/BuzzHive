import { CommunityContext } from "./CommunityContext";
import { useContext } from "react";

function BoardHeader(){
    const {community,avatar,slogan,cover,name}=useContext(CommunityContext);
    if(!name){
        return null;
    }
    
    
    return(
        <>
            <div  className='h-60 bg-cover' style={{ backgroundImage: `url('${cover}')` }}>
            </div> 
            <div className='bg-buzzhive_dark-brighter'>
                <div className='mx-6 relative flex '>
                    <div className='h-20 w-20 rounded-full overflow-hidden relative -top-3 border-4 border-white bg-white'>
                    <img src={avatar} alt=''/>

                        {/* <img src='https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?width=256&format=pjpg&v=enabled&s=6a2945f540463756d33acd2919b0476668879106' alt=''/> */}
                    </div> 
                    <div className='pt-2 pl-4'>
                        <h1 className='text-gray-300 text-3xl'>{community}:{slogan}</h1>
                        <h5 className='text-gray-500'>h/{community}</h5>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardHeader;