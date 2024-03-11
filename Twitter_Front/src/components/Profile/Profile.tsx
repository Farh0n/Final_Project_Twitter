import { useEffect, useState } from "react";
import Tweet from "../Tweet/Tweet";
import {get,put} from '../../utils/httpClient';
import {Link} from 'react-router-dom';
import './Profile.css';

// type UserProps={
//     username:string
//     name:string
//     email:string
//     password:string
// }

// type ProfileProps={
//     user:UserProps
//     tweets : TweetProps[]
// }

interface User {
    id:number;
    username:string;
    password:string;
    email:string;
    first_name:string;
}
interface TweetData {
    id:number;
    user_id:number;
    username:string;
    content:string;
    image_url:string;
}


function Profile(){

    const [currentUser,setCurrentUser] = useState<null|User>(null);
    const [tweets, setTweets] = useState<TweetData[]>([]);
    const [editable, setEditable] = useState(false);
    const [email,setEmail] = useState('');
    const [firstname,setFirstname] = useState('');
    
    const loadUserTweets=async()=>{
        try{
            const localUser = localStorage.getItem('user');
            if(localUser){
                const parsedUser = JSON.parse(localUser);
                console.log('loading : ' + parsedUser.id);
                const response = await get(`/tweets/${parsedUser.id}`);
                if(response){
                    setTweets(response);
                }
            }
        }catch(error){
            console.error('Error getting Tweets: ' + error);
            alert('error loading user tweets');
        }
    };

    const updateUser = async () => {
        try {
            if (email&&firstname) {
                const localUser = localStorage.getItem('user');
                    if(localUser){
                        const parsedUser = JSON.parse(localUser);
                        parsedUser.email = email;
                        parsedUser.first_name=firstname;
                        await put(`/user/${currentUser?.id}`,{
                            email :email,
                            firstname:firstname
                        });
                        setCurrentUser(parsedUser);
                        localStorage.setItem('user',JSON.stringify(parsedUser));
                        setEditable(false);
                        alert('user details changed');
                    }
            }
        } catch (error) {
            console.error('Error updating user: ' + error);
            alert('error updating user');
        }
    };

    useEffect(()=>{
        const localUser = localStorage.getItem('user');
        if(localUser){
            const parsedUser = JSON.parse(localUser);
            setCurrentUser(parsedUser);
            setEmail(parsedUser.email);
            setFirstname(parsedUser.first_name);
        }
        loadUserTweets();
    },[]);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setUpdatedUser(prevUser => ({
    //         ...prevUser!,
    //         [name]: value
    //     }));
    // };


    return (
        <div>
            <div className="header">
                <Link to={'/'}>Main Menu</Link>
            </div>
            <div className="user-info">
            {currentUser && (
                    <>
                        <div>
                            <label>Username:</label>
                            <input type="text" value={currentUser.username} readOnly={!editable} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={editable ? (email || currentUser.email) : currentUser.email} readOnly={!editable} name="email" onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>First Name:</label>
                            <input type="text" value={editable ? (firstname || currentUser.first_name) : currentUser.first_name} readOnly={!editable} name="first_name" onChange={(e)=>setFirstname(e.target.value)} />
                        </div>
                        {editable && (
                            <button onClick={updateUser}>Update</button>
                        )}
                    </>
                )}
                {!editable && (
                <button onClick={() => setEditable(true)}>Edit</button>
            )}
            </div>
            <div className="user-tweets">
                    {tweets.map((tweet,index)=>{
                      return(
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
    );

};
export default Profile;