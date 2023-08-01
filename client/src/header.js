import Logo from './logo.png'
import Avatar from './avatar.png';
import { BellIcon, ChatIcon, ChevronDownIcon, LoginIcon, PlusIcon, SearchIcon, UserIcon,LogoutIcon } from '@heroicons/react/outline';
import Button from './Button';
import { useState, useContext} from 'react';
import ClickOutHandler from 'react-clickout-handler';
import AuthModalcontext from './AuthModalcontext';
import userContext from './userContext';
import { Link } from 'react-router-dom';
import RedirectContext from './RedirectContext';
import PostFormModalContext from './PostFormModalContext'
import { CommunityContext } from './CommunityContext';

function Header(){

    const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] = useState('hidden');
    const [plusDropdownVisibilityClass,setPlusDropdownVisibilityClass]=useState('hidden');
    const {setShow:setShowPost}=useContext(PostFormModalContext)
    const {setShow:setShowCommunity}=useContext(CommunityContext);
    const [SearchText,setSearchText]=useState('');
    const {setRedirect}=useContext(RedirectContext);

    function toggleUserDropdown(){
        if(userDropdownVisibilityClass==='hidden'){
            setUserDropdownVisibilityClass('block');
        } else{
            setUserDropdownVisibilityClass('hidden');
        }
    }

    function doSearch(ev){
        ev.preventDefault();
        setRedirect('/search/'+encodeURIComponent(SearchText));
    }

    const outline=true
    const AuthModal=useContext(AuthModalcontext);
    const user = useContext(userContext);
    return (
        <header className="w-full bg-buzzhive_dark p-2 ">
        <div className='mx-4 flex relative'>
            
            <Link to="/">
                <img src={Logo} alt="" className="w-8 h-8 mr-4 "/>        
            </Link>
            
            
            <form onSubmit={doSearch} className='bg-buzzhive_dark-brighter px-3 flex rounded-md border border-buzzhive_border mx-4 flex-grow'>
                <SearchIcon className='text-gray-300 h-6 w-6 mt-1'/>
                <input type='text' className='bg-buzzhive_dark-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-white' placeholder='Search'
                    value={SearchText}
                    onChange={(ev)=>setSearchText(ev.target.value)}
                />
            </form>
        
        {user.username && (
            <>
            <button className='px-2 py-1'>
                <ChatIcon className='text-gray-400 w-6 h-6 mx-2'/>
            </button>

            <button className='px-2 py-1'>
                <BellIcon className='text-gray-400 w-6 h-6 mx-2'/>
            </button>
            <ClickOutHandler onClickOut={()=> setPlusDropdownVisibilityClass('hidden')}>
            <button className='px-2 py-1' onClick={()=>setPlusDropdownVisibilityClass('block')}>
                <PlusIcon className='text-gray-400 w-6 h-6 mx-2'/>
            </button>
            <div className='relative'>
            <div className={'absolute right-0 bg-buzzhive_dark border border-gray-700 z-10 rounded-md text-buzzhive_text overflow-hidden ' + plusDropdownVisibilityClass} style={{width:'250px'}}>
                    <button 
                        onClick={()=>{setShowPost(true);setPlusDropdownVisibilityClass('hidden')}}
                        className='block flex w-full py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' >
                        <PlusIcon className='w-6 h-6 mr-2'/>
                        Create post
                    </button>
                    <button 
                        onClick={()=>{setShowCommunity(true);
                            setPlusDropdownVisibilityClass('hidden')}}
                        className='block flex w-full py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' >
                        <PlusIcon className='w-6 h-6 mr-2'/>
                        Create new Community
                    </button>
            </div>
            </div>
           
            
            </ClickOutHandler>
            

            </>
        )}

        {!user.username && (
            <div className='mx-2 hidden sm:block'>
                <Button outline="true" className ='mr-1 h-8' onClick={()=>AuthModal.setShow('login')}>Log In</Button>
                <Button className= 'h-8' onClick={()=>AuthModal.setShow('register')}>Sign Up</Button>
            </div>

        )}

        
        <ClickOutHandler onClickOut={()=>setUserDropdownVisibilityClass('hidden')}>
            <button className=' rounded-md  flex ml-4 border border-gray-700' onClick={()=> toggleUserDropdown()}>
                {!user.username && (
                    <UserIcon className='w-6 h-6 text-gray-400 m-1' />

                )}
                {user.username && (
                    <div className='h-8 w-8 bg-gray-600 rounded-md '>
                        <img src={Avatar} alt='' className='block'/>
                    </div>
                )}
            
                <ChevronDownIcon className='text-gray-500 w-5 h-5 mt-2 m-1'/>
            </button>
            <div className={'absolute right-0 top-8 bg-buzzhive_dark border border-gray-700 z-10 rounded-md text-buzzhive_text overflow-hidden ' + userDropdownVisibilityClass}>
                {user.username && (
                    <span className='block w-50 py-2 px-3 text-sm'>
                        Hello, {user.username}
                    </span>
                )}
                {!user.username && (

                    <button 
                        onClick={()=>AuthModal.setShow('login')}
                        className='block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' >
                        <LoginIcon className='w-6 h-6 mr-2'/>
                        Log In / Sign Up
                    </button>
                )}
                {user.username && (
                    <button 
                        onClick={()=>user.logout()}
                        className='block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' >
                        <LogoutIcon className = 'w-6 h-6 mr-2'/>
                        Logout
                    </button>
                )}
            
        </div>
        </ClickOutHandler>
        </div>
        </header>
    );
}

export default Header;