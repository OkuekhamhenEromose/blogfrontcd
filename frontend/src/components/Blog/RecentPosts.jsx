// RecentPosts.jsx
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecentPosts.css";

const getCorrectImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (imageUrl.endsWith(".txt") || !imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return null;
  }
  return imageUrl.replace(
    "ch-blog-media.s3.eu-north-1.amazonaws.com",
    "blogbackc.s3.eu-north-1.amazonaws.com"
  );
};

// Custom arrows
const CustomPrevArrow = ({ onClick }) => (
  <button className="slider-arrow slider-arrow-prev" onClick={onClick}>
    <ChevronLeft size={20} />
  </button>
);
const CustomNextArrow = ({ onClick }) => (
  <button className="slider-arrow slider-arrow-next" onClick={onClick}>
    <ChevronRight size={20} />
  </button>
);

const RecentPosts = ({ posts }) => {
  const getContentExcerpt = (content) => {
    if (!content) return "No content available...";
    return content.length > 120 ? content.substring(0, 120) + "..." : content;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="recent-posts-empty">
        <p>No recent posts available.</p>
      </div>
    );
  }

  return (
    <div className="recent-posts-slider">
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.id} className="slider-item">
            <div className="recent-post-card">
              {post.image ? (
                <img
                  src={getCorrectImageUrl(post.image)}
                  alt={post.title || "Blog post"}
                  className="recent-post-image"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <div className="recent-post-image-placeholder">
                  <span>No Image</span>
                </div>
              )}

              <div className="recent-post-content">
                <h3 className="recent-post-title">
                  <Link to={`/blog/${post.id}`}>{post.title || "Untitled Post"}</Link>
                </h3>
                <p className="recent-post-excerpt">{getContentExcerpt(post.content)}</p>
                <div className="recent-post-meta">
                  {post.category?.title && (
                    <span className="recent-post-category">{post.category.title}</span>
                  )}
                  {post.created_at && (
                    <span className="recent-post-date">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  )}
                  <span className="recent-post-comments">
                    {post.comments_count || 0} comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentPosts;
