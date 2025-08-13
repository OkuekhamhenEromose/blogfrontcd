import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getCategories } from '../../api/blog';
import Hero from '../../components/Common/Hero';
import Categories from '../../components/Blog/Categories';
import RecentPosts from '../../components/Blog/RecentPosts';
import BlogCard from '../../components/Blog/BlogCard';
import './Dashboard.css';

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="blog-dashboard">
      <Hero title="Blog Dashboard" subtitle="Explore our latest posts" />
      <Categories categories={categories} />
      <RecentPosts posts={posts.slice(0, 3)} />
      <section className="all-posts">
        <h2>All Posts</h2>
        <div className="posts-grid">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      {user?.is_blog_admin && (
        <Link to="/admin" className="admin-link">Go to Admin Dashboard</Link>
      )}
    </div>
  );
};

export default BlogDashboard;