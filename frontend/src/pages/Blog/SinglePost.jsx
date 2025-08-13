import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getComments, addComment, toggleLike } from '../../api/blog';
import PostDetail from '../../components/Blog/PostDetail';
import CommentForm from '../../components/Blog/CommentForm';
import Comment from '../../components/Blog/Comment';
import './SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getComments(id)
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (comment) => {
    setIsSubmittingComment(true);
    try {
      const newComment = await addComment(post.id, comment);
      setComments([...comments, newComment]);
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLike = async () => {
    try {
      await toggleLike(post.id);
      const updatedPost = await getPost(id);
      setPost(updatedPost);
    } catch (err) {
      setError('Failed to toggle like');
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="not-found">Post not found</div>;

  return (
    <div className="single-post-container">
      <PostDetail post={post} onLike={handleLike} />
      
      <section className="comments-section">
        <h2 className="comments-title">
          Comments ({comments.length})
        </h2>
        
        <CommentForm 
          onSubmit={handleCommentSubmit} 
          isSubmitting={isSubmittingComment} 
        />
        
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SinglePost;