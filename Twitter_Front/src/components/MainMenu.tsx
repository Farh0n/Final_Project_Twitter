import{Link,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import image1 from '../images/icon.png';
import image2 from '../images/FullMoon2010.jpg';
import Tweet from './Tweet/Tweet';


function MainMenu(){

    const [tweets,setTweets] = useState([
        {
            username:"farhan1",
            content:"hello",
            image: image1
        },
        {
            username:"sahand1",
            content:"beatiful moon",
            image: image2
        }
    ]);
    const navigate = useNavigate();

    const handelLogOut=()=>{
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        // Check if the user is logged in
        if (!localStorage.getItem("user")) {
            // If not logged in, redirect to the login page
            navigate('/login');
        }
        const newTweet = localStorage.getItem('newTweet')
        if(newTweet) {
            const parsedTweet = JSON.parse(newTweet);
            const newValue = [parsedTweet,...tweets];
            setTweets(newValue);
            localStorage.removeItem('newTweet');
        }
    }, []);
    

    return(
        <>
            <div className='container'>    
                <div className='header'>
                    <Link to={'/profile'}><div className='profile'> Hi User</div></Link>
                    <Link to={'/tweet'}><div className='new tweet'>New Tweet</div></Link>
                    <button onClick={handelLogOut}> Log Out</button>
                </div>

                <div className='tweets'>
                    {tweets.map((tweet,index)=>{
                      return <Tweet
                        key={index}
                        username={tweet.username}
                        content={tweet.content}
                        image={tweet.image}
                    />
                    })}
                </div>
            </div>

        </>
    )
}
export default MainMenu;