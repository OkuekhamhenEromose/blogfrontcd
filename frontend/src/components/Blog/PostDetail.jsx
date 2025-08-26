import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  deletePost,
  getComments,
  addComment,
  updateComment,
  deleteComment,
  updatePost,
} from "../../api/blog";
import { useAuth } from "../../context/AuthContext";
import CommentForm from "../Blog/CommentForm";
import "./PostDetail.css";

const PostDetail = ({ post, onLike }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const data = await getComments(post.id);
    setComments(data);
  };

  const handleLike = () => {
    onLike();
    setIsLiked(!isLiked);
  };

  /** ---------- POST ACTIONS ---------- **/
  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
        navigate("/blog");
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  /** ---------- COMMENT ACTIONS ---------- **/
  const handleAddComment = async (body) => {
    await addComment(post.id, body);
    loadComments();
  };

  const handleUpdateComment = async (id, body) => {
    await updateComment(id, body);
    setEditingCommentId(null);
    loadComments();
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm("Delete this comment?")) {
      await deleteComment(id);
      loadComments();
    }
  };

  return (
    <article className="post-detail">
      {/* ---------- POST IMAGE ---------- */}
      {post.image && (
        <div className="post-image-container">
          <img 
            src={post.image} 
            alt={post.title} 
            className="post-image"
          />
        </div>
      )}
      
      {/* ---------- POST HEADER ---------- */}
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author.username}</span>
          <span className="post-date">
            {format(new Date(post.created_at), "MMMM d, yyyy")}
          </span>
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
        </div>
      </header>

      {/* ---------- POST CONTENT ---------- */}
      <div className="post-content">{post.content}</div>

      {/* ---------- POST FOOTER ---------- */}
      <footer className="post-footer">
        <div className="post-stats">
          <button
            onClick={handleLike}
            className={`like-btn ${isLiked ? "liked" : ""}`}
          >
            {isLiked ? "❤️" : "♡"} Like ({post.likes_count || 0})
          </button>
          <span className="comment-count">
            💬 Comments ({comments.length})
          </span>
        </div>

        {(user?.id === post.author.id || user?.is_blog_admin) && (
          <div className="post-actions">
            <button
              onClick={() => navigate(`/blog/${post.id}/edit`)}
              className="edit-btn"
            >
              Edit Post
            </button>
            <button
              onClick={handleDeletePost}
              className="delete-btn"
            >
              Delete Post
            </button>
          </div>
        )}
      </footer>

      {/* ---------- COMMENTS SECTION ---------- */}
      <section className="comments-section">
        <h3>Comments</h3>

        {/* ✅ Single Comment Form for NEW comments */}
        <CommentForm onSubmit={handleAddComment} />
        <ul className="comments-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              {editingCommentId === c.id ? (
                // ✅ Show form only for the comment being edited
                <CommentForm
                  onSubmit={(body) => handleUpdateComment(c.id, body)}
                  initialValue={c.body}
                  isEditing={true}
                  isSubmitting={false}
                  onCancel={() => setEditingCommentId(null)}
                />
              ) : (
                <>
                  <p>
                    <strong>{c.user.username}</strong>: {c.body}
                  </p>
                  {(user?.id === c.user.id || user?.is_blog_admin) && (
                    <div className="comment-actions">
                      <button
                        onClick={() => setEditingCommentId(c.id)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default PostDetail;