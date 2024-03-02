import { useEffect, useState } from 'react';

type User = {
    name: string
    username: string
    image: File |null 
  }

export type TweetProps ={
    user: User
    content: String
    image: File | null
}

function Tweet({user,content,image}:TweetProps){
    const [imageUrl, setImageUrl] = useState<string | null>(null);
   
    useEffect(() => {
        if (image) {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            if (result && typeof result === 'string') {
              setImageUrl(result);
            }
          };
          reader.readAsDataURL(image);
        }
      }, [image]);

      const showMiniProfile = ()=>{

      };

      return (
        <div className='tweet'>
            <div className='username' onClick={showMiniProfile}>by: {user.username}</div>
            <div className='content'> {content}</div>
            {image && (
                <div>
                {imageUrl && <img src={imageUrl} alt={`${image.name}`} style={{ maxWidth: '65%', maxHeight: '200px' }} />}
                </div>
            )}
        </div>
      );
};

export default Tweet;