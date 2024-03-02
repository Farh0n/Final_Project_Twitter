import { useState } from 'react';
import PhotoUploader from '../PhotoUploader';
import {Link,useNavigate } from 'react-router-dom';


function NewTweet (){
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const uploadTweet=()=>{
        if(!content){
            alert("Fill all inputs");
            return;
        }
        //make tweet and add to the tweets
        navigate('/');

    }

    return (
        <div>
            <input type="text" placeholder='Content' value={content} onChange={(e)=> setContent(e.target.value)} />
            <PhotoUploader/>
            <button onClick={uploadTweet}>Tweet</button>
            <Link to={'/'}><div className='cancel-button'>Cancel</div></Link>
        </div>
    );
};

export default NewTweet;