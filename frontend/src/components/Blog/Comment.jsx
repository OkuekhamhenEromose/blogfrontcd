import { format } from 'date-fns';
import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.user.username}</span>
        <span className="comment-date">
          {format(new Date(comment.created_at), 'MMMM d, yyyy')}
        </span>
      </div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;