import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getPost } from "../../api/blog";
import "./BlogForm.css";

const BlogForm = ({ categories = [], onSubmit, initialData = {}, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category_id: initialData?.category_id || "",
    published: initialData?.published ?? false,
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.category_id || isNaN(Number(formData.category_id)))
      newErrors.category_id = "Please select a valid category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id && !initialData?.id) {
      getPost(id)
        .then((post) => {
          if (post) {
            setFormData({
              title: post.title || "",
              content: post.content || "",
              category_id: post.category?.id || "",
              published: post.published ?? false,
              image: null,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [id, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  if (!validateForm()) return;

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("published", formData.published);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    if (id) {
      await updatePost(id, formDataToSend);
    } else {
      await createPost(formDataToSend);
    }

    navigate("/blog");
  } catch (err) {
    console.error("Error saving post:", err.response?.data || err.message);
    if (err.response?.data) {
      setErrors(err.response.data);
    }
  }
};


  return (
    <div className="blog-form-container">
      <form className="blog-form" onSubmit={handleSubmit}>
        <h2>{id ? "Edit Post" : "Create Post"}</h2>

        <div className={`form-group ${errors.title ? "has-error" : ""}`}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a catchy title"
            required
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>

        <div className={`form-group ${errors.content ? "has-error" : ""}`}>
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post..."
            required
          />
          {errors.content && <div className="form-error">{errors.content}</div>}
        </div>

        <div className={`form-group ${errors.category_id ? "has-error" : ""}`}>
          <label>Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <div className="form-error">{errors.category_id}</div>
          )}
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <label>Published</label>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Saving...
              </>
            ) : id ? (
              "Update Post"
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
