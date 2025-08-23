import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, toggleLike } from "../../api/blog"; // ❌ removed getComments, addComment
import PostDetail from "../../components/Blog/PostDetail";
import "./SinglePost.css";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isValidPostId = id && !isNaN(Number(id));

  useEffect(() => {
    if (!isValidPostId) return;

    const fetchData = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (err) {
        console.error("Error loading post", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isValidPostId]);

  const handleLike = async () => {
    try {
      await toggleLike(post.id);
      const updatedPost = await getPost(id);
      setPost(updatedPost);
    } catch (err) {
      setError("Failed to toggle like");
    }
  };

  if (!isValidPostId) return null;
  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="not-found">Post not found</div>;

  return (
    <div className="single-post-container">
      {/* ✅ PostDetail already includes comments */}
      <PostDetail post={post} onLike={handleLike} />
    </div>
  );
};

export default SinglePost;
