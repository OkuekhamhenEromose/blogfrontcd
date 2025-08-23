import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, getCategories } from "../../api/blog";
import Hero from "../../components/Common/Hero";
import Navbar from "../../components/Common/Navbar";
import Categories from "../../components/Blog/Categories";
import RecentPosts from "../../components/Blog/RecentPosts";
import BlogCard from "../../components/Blog/BlogCard";
import DebugImages from "../../components/Blog/DebugImages";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

// Temporary TestImage component - ADD THIS
const TestImage = ({ url }) => {
  return (
    <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
      <h4>🛠️ DEBUG IMAGE: {url}</h4>
      <img 
        src={url} 
        alt="Test" 
        style={{ maxWidth: '200px', display: 'block' }}
        onError={(e) => console.error('❌ Image failed to load:', url)}
        onLoad={(e) => console.log('✅ Image loaded successfully:', url)}
      />
      <button onClick={() => window.open(url, '_blank')}>
        Open URL in New Tab
      </button>
    </div>
  );
};

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDebug, setShowDebug] = useState(true); // ADD THIS STATE
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories(),
        ]);
        
        // DEBUG: Log what we receive from API
        console.log('=== API RESPONSE DEBUG ===');
        postsData.forEach((post, index) => {
          console.log(`Post ${index + 1}:`, {
            id: post.id,
            title: post.title,
            hasImage: !!post.image,
            imageUrl: post.image,
            imageType: typeof post.image
          });
        });

        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navbar />
      
      {/* Full-Screen Hero Section */}
      <Hero 
        title="A Discount Toner Cartridge Is Better Than Ever"
        subtitle="Explore our latest posts and insights about technology, fashion, and travel"
        compact={false}
      >
        {user && (
          <button 
            onClick={() => navigate("/blog/create")} 
            className="hero-btn"
          >
            Create New Post
          </button>
        )}
      </Hero>
      {showDebug && <DebugImages />}

      {/* Main Content - Scrollable */}
      <main className="dashboard-main">
        
        {/* DEBUG SECTION - ADD THIS */}
        {showDebug && posts.length > 0 && (
          <section className="content-section" style={{ backgroundColor: '#fff3cd', border: '2px solid #ffc107' }}>
            <div className="container">
              <h2 style={{ color: '#856404' }}>🛠️ DEBUG IMAGE TESTING</h2>
              <button 
                onClick={() => setShowDebug(!showDebug)}
                style={{ marginBottom: '20px' }}
              >
                {showDebug ? 'Hide Debug' : 'Show Debug'}
              </button>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {posts.slice(0, 3).map(post => (
                  post.image && <TestImage key={post.id} url={post.image} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="content-section">
          <div className="container">
            <Categories categories={categories} />
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="content-section">
          <RecentPosts posts={posts.slice(0, 6)} />
        </section>

        {/* All Posts Section */}
        <section className="content-section posts-section">
          <div className="container">
            <h2 className="section-title">Latest Posts</h2>
            <div className="posts-grid">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))
              ) : (
                <div className="no-posts-message">
                  <p>No posts available yet.</p>
                </div>
              )}
            </div>

            <div className="view-all-container">
              <Link to="/blog/all" className="btn btn-primary">
                View All Posts →
              </Link>
            </div>
          </div>
        </section>

        {/* Admin Section */}
        {user?.is_blog_admin && (
          <section className="content-section admin-section">
            <div className="container">
              <Link to="/admin" className="admin-link">
                Go to Admin Dashboard
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BlogDashboard;