import Tweet,{TweetProps} from "../Tweet/Tweet";

type UserProps={
    username:string
    name:string
    email:string
    password:string
}

type ProfileProps={
    user:UserProps
    tweets : TweetProps[]
}



function Profile({user,tweets}:ProfileProps){
    
    return (
        <div>
            <div className="user-info">
                <h1>{user.name}</h1>
            </div>
            <div className="user-tweets">
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
    );

};
export default Profile;