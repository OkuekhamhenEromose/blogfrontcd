import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ post, admin = false }) => {
  // Safely handle potentially undefined content
  const contentExcerpt = post.content
    ? post.content.substring(0, 150) + "..."
    : "No content available...";

    const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    // Replace ch-blog-media with blogbackc if needed
    return imageUrl.replace(
      'ch-blog-media.s3.eu-north-1.amazonaws.com',
      'blogbackc.s3.eu-north-1.amazonaws.com'
    );
  };

  return (
    <div className={`blog-card ${admin ? "admin" : ""}`}>
      {/* Blog Image - Use the URL directly from API */}
      {post.image && (
        <img
          src={getImageUrl(post.image)}
          alt={post.title || "Blog post image"}
          className="blog-card-image"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.style.display = "none";
          }}
        />
      )}

      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={admin ? `/admin/posts/${post.id}` : `/blog/${post.id}`}>
            {post.title || "Untitled Post"}
          </Link>
        </h3>

        <div className="blog-card-meta">
          <span className="blog-card-author">
            By {post.author?.username || "Unknown Author"}
          </span>
          <span className="blog-card-date">
            {post.created_at
              ? new Date(post.created_at).toLocaleDateString()
              : "No date"}
          </span>

          {post.category && (
            <span className="blog-card-category">
              {post.category.title || post.category.name || "Uncategorized"}
            </span>
          )}
        </div>

        <p className="blog-card-excerpt">{contentExcerpt}</p>

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