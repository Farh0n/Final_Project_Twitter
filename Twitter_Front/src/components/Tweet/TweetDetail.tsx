import { CommentProps } from "./Comment";
import Tweet,{TweetProps} from "./Tweet";

type TweetDetailProps = {
    tweet:TweetProps
    comments: CommentProps[]
}



function TweetDetail({tweet,comments}:TweetDetailProps){

    const renderComments=()=>{

    };

    return (
        <div>
            <Tweet user={tweet.user} content={tweet.content} image={tweet.image} />
            <div className="comments">

            </div>
            <input type="text" placeholder="New Comment"/>
            <button>Comment</button>

        </div>
    )
};


export default TweetDetail;