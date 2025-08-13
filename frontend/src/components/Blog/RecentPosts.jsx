import { Link } from 'react-router-dom';
import './RecentPosts.css';

const RecentPosts = ({ posts }) => {
  return (
    <section className="recent-posts">
      <h2 className="section-title">Recent Posts</h2>
      <div className="recent-posts-grid">
        {posts.map(post => (
          <div key={post.id} className="recent-post-card">
            <h3 className="recent-post-title">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h3>
            <p className="recent-post-excerpt">
              {post.content.substring(0, 100)}...
            </p>
            <div className="recent-post-meta">
              <span className="recent-post-date">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className="recent-post-comments">
                {post.comments_count || 0} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;