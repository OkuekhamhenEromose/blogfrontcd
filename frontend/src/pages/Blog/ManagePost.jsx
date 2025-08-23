import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../api/blog";
import { useAuth } from "../../context/AuthContext";
import PostDetail from "../../components/Blog/PostDetail";

const ManagePost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.is_blog_admin) {
      setError("Unauthorized: Admins only");
      setTimeout(() => navigate("/blog"), 2000);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch {
        setError("Failed to load post");
      }
    };

    fetchData();
  }, [id, user, navigate]);

  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="manage-post-container">
      <h2>Manage Post</h2>
      <PostDetail post={post} onLike={() => {}} />
    </div>
  );
};

export default ManagePost;
