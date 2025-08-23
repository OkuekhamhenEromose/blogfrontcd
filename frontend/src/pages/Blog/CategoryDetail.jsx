import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryDetails } from "../../api/blog";
import BlogCard from "../../components/Blog/BlogCard";
// import "./CategoryDetail.css";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryDetails(id);
        setCategory(data);
      } catch (err) {
        console.error("Error fetching category details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category not found</p>;

  return (
    <div className="category-detail">
      <h2>{category.name}</h2>
      <p>Total Posts: {category.total_posts}</p>
      <p>Total Comments: {category.total_comments}</p>
      <p>Total Likes: {category.total_likes}</p>

      <section className="category-posts">
        <h3>Posts in this Category</h3>
        <div className="posts-grid">
          {category.posts.length > 0 ? (
            category.posts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <p>No posts yet in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail;
