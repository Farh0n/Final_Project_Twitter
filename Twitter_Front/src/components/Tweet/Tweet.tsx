import { useEffect, useState } from 'react';

export type TweetProps ={
    username: string
    content: String
    image: String | File
}

function Tweet({username,content,image}:TweetProps){
    const [imageUrl, setImageUrl] = useState<string | null>(null);
   

    useEffect(() => {
      if (image instanceof File) {
          const reader = new FileReader();
          reader.onload = () => {
              const result = reader.result;
              if (result && typeof result === 'string') {
                  setImageUrl(result);
              }
          };
          reader.readAsDataURL(image);
      } else if (typeof image === 'string') {
          // If image is a static image path
          setImageUrl(image);
      }
  }, [image]);
    // useEffect(() => {
    //     if (image) {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         const result = reader.result;
    //         if (result && typeof result === 'string') {
    //           setImageUrl(result);
    //         }
    //       };
    //       reader.readAsDataURL(image);
    //     }
    //   }, [image]);

      const showMiniProfile = ()=>{

      };

      return (
        <div className='tweet'>
            <div className='username' onClick={showMiniProfile}>by: {username}</div>
            <div className='content'> {content}</div>
            {image && (
                <div>
                {imageUrl && <img src={imageUrl} alt={`${username}`} style={{ maxWidth: '65%', maxHeight: '200px' }} />}
                </div>
            )}
        </div>
      );
};

export default Tweet;