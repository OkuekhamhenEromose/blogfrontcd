import { useState } from 'react';
import { format } from 'date-fns';
import './PostDetail.css';

const PostDetail = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = () => {
    onLike();
    setIsLiked(!isLiked);
  };

  return (
    <article className="post-detail">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author.username}</span>
          <span className="post-date">
            {format(new Date(post.created_at), 'MMMM d, yyyy')}
          </span>
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
        </div>
      </header>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <footer className="post-footer">
        <button 
          onClick={handleLike} 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? '❤️' : '♡'} Like ({post.likes_count || 0})
        </button>
      </footer>
    </article>
  );
};

export default PostDetail;