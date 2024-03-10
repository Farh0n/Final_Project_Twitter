import './Tweet.css'
// import React, { useState, useEffect } from 'react';

export type TweetProps ={
    username: string
    content: String
    image: string
}

function Tweet({username,content,image}:TweetProps){
//     const [imageUrl, setImageUrl] = useState<string | null>(null);
   

//     useEffect(() => {
//     if (typeof image === 'string') {
//           setImageUrl(image);
//     }
//   }, [image]);

      const showMiniProfile = ()=>{

      };

      return (
        <div className='tweet'>
            <div className='username' onClick={showMiniProfile}>by: {username}</div>
            <div className='content'> {content}</div>
            {/* {image && (
                <div>
                {imageUrl && <img src={imageUrl} alt={`${username}`} style={{ maxWidth: '65%', maxHeight: '200px' }} />}
                </div>
            )} */}
            <img src={`${image}`} alt={`${username}`}></img>
            {/* {imageUrl && (
                <div>
                    <img src={imageUrl} alt={`${username}`} style={{ maxWidth: '65%', maxHeight: '200px' }} />
                </div>
            )} */}
        </div>
      );
};

export default Tweet;