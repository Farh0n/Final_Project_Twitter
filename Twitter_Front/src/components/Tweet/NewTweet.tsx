import { useState } from 'react';
import PhotoUploader from '../PhotoUploader';
import {Link,useNavigate } from 'react-router-dom';
import './NewTweet.css'


function NewTweet (){
    const [content, setContent] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileUpload = (file: File) => {
        setUploadedFile(file);
    };

    const uploadTweet=()=>{
        if(!content){
            alert("Fill all inputs");
            return;
        }
        //make tweet and add to the tweets
        const currentUser = localStorage.getItem('user');
        if(currentUser){
            const parsedUser=JSON.parse(currentUser);
            const newTweet ={
                username: parsedUser,
                content:content,
                image:uploadedFile
            }
            localStorage.setItem('newTweet',JSON.stringify(newTweet));
            navigate('/');
        }

    }

    return (
        <div>
            <input type="text" placeholder='Content' value={content} onChange={(e)=> setContent(e.target.value)} />
            <PhotoUploader onFileUpload={handleFileUpload}/>
            <button onClick={uploadTweet}>Tweet</button>
            <Link to={'/'}><div className='cancel-button'>Cancel</div></Link>
        </div>
    );
};

export default NewTweet;