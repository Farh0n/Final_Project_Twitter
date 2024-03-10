import { useState } from 'react';
import PhotoUploader from '../PhotoUploader';
import {Link,useNavigate } from 'react-router-dom';
import './NewTweet.css'
import { post } from '../../utils/httpClient';


function NewTweet (){
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileUpload = (file: File) => {
        setUploadedFile(file);
    };

    const uploadTweet= async()=>{
        if(!content||!imageUrl){
            alert("Fill all fields");
            return;
        }
        //make tweet and add to the tweets
        const currentUser = localStorage.getItem('user');
        console.log("current user :" +currentUser);
        if(currentUser){
            const parsedUser=JSON.parse(currentUser);
            console.log(parsedUser);
            try{
                const response = await post('/tweet/new',{ 
                    userId: parsedUser.id,
                    username:parsedUser.username,
                    content:content,
                    imageUrl: imageUrl
                });
                if(response){
                    navigate('/');
                }
                
            } catch (error) {
                console.error('Error adding task:', error);
                alert('Error adding Tweet. Please try again.');
            }
            // const newTweet ={
            //     username: parsedUser,
            //     content:content,
            //     image:uploadedFile
            // }
            // localStorage.setItem('newTweet',JSON.stringify(newTweet));
            // navigate('/');
        }

    }

    return (
        <div>
            <input type="text" placeholder='Content' value={content} onChange={(e)=> setContent(e.target.value)} />
            {/* <PhotoUploader onFileUpload={handleFileUpload}/> */}
            <input type="text" placeholder='Image URL' value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)}></input>
            <button onClick={uploadTweet}>Tweet</button>
            <Link to={'/'}><div className='cancel-button'>Cancel</div></Link>
        </div>
    );
};

export default NewTweet;