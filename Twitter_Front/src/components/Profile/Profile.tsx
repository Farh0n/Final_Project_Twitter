import Tweet,{TweetProps} from "../Tweet/Tweet";

type UserProps={
    username:string
    name:string
    email:string
}

type ProfileProps={
    user:UserProps
    tweets : TweetProps[]
}



function Profile({user,tweets}:ProfileProps){
    
    const renderTweets=()=>{

    };

    return (
        <div>
            <div className="user-info">
                <h1>{user.name}</h1>
            </div>
            <div className="user-tweets">

            </div>
        </div>
    );

};
export default Profile;