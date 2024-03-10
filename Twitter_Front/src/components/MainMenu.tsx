import{Link,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tweet from './Tweet/Tweet';
import '../styles/MainMenu.css'
import {get} from '../utils/httpClient';

interface TweetData {
    id:number;
    user_id:number;
    username:string;
    content:string;
    image_url:string;
}


function MainMenu(){
    const navigate = useNavigate();
    const [tweets, setTweets] = useState<TweetData[]>([]);
    const [username,setUsername] = useState<string|null>(null);

    const handleLogOut=()=>{
        localStorage.removeItem('user');
        navigate('/login');
    };

    const loadTweets=async()=>{
        try{
            const response = await get('/tweets');
            if(response){
                console.log("tweets");
                setTweets(response);
            }
        }catch(error){
            console.error('Error getting tweets:', error);
            alert('Error getting tweets. Please try again.');
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            // If not logged in, redirect to the login page
            navigate('/login');
        }
        const currentUser = localStorage.getItem('user');
        if(currentUser){
            const parsedUser=JSON.parse(currentUser);
            setUsername(parsedUser.username);
        }
        loadTweets();
        // const newTweet = localStorage.getItem('newTweet')
        // if(newTweet) {
        //     const parsedTweet = JSON.parse(newTweet);
        //     const newValue = [parsedTweet,...tweets];
        //     setTweets(newValue);
        //     localStorage.removeItem('newTweet');
        // }
    }, []);
    

    return(
        <>
        <div className='header'>
            <Link to={'/profile'} className='profile'>Hi {username}</Link>
            <Link to={'/new'} className='new-tweet'>New Tweet</Link>
            <button onClick={handleLogOut} className='logout-button'>Log Out</button>
        </div>
    
        <div className='container'>
            <div className='tweets'>
                {tweets.map((tweet,index) => {
                    return (
                        <Tweet
                            key={index}
                            username={tweet.username}
                            content={tweet.content}
                            image={tweet.image_url}
                        />
                    );
                })}
            </div>
        </div>
    </>
    )
}
export default MainMenu;

