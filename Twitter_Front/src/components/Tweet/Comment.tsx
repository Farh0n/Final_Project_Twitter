
export type CommentProps= {
    username:string
    content: string
}

function Comment ({username,content}:CommentProps){


    return (
        <div className="comment">
            <div className="username">{username}</div>
            <p>{content}</p>
        </div>
    );
};

export default Comment;