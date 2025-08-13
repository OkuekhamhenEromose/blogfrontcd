import { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onSubmit, isSubmitting }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        required
        rows="3"
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;