import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post, admin = false }) => {
  return (
    <div className={`blog-card ${admin ? 'admin' : ''}`}>
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={admin ? `/admin/posts/${post.id}` : `/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        <div className="blog-card-meta">
          <span className="blog-card-author">By {post.author.username}</span>
          <span className="blog-card-date">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
          {post.category && (
            <span className="blog-card-category">{post.category.name}</span>
          )}
        </div>
        <p className="blog-card-excerpt">
          {post.content.substring(0, 150)}...
        </p>
        <div className="blog-card-stats">
          <span className="blog-card-likes">❤️ {post.likes_count || 0}</span>
          <span className="blog-card-comments">
            💬 {post.comments_count || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;