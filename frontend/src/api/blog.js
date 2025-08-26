import api from "./axios";

// --- Posts ---
export const getPosts = async () => {
  try {
    const res = await api.get("/posts/");
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}/`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData) => {
  const res = await api.post("/posts/", postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updatePost = async (id, postData) => {
  const res = await api.put(`/posts/${id}/`, postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}/`);
};

// --- Categories ---
export const getCategories = async () => {
  try {
    const res = await api.get("/categories/");
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryDetails = async (id) => {
  const res = await api.get(`/categories/${id}/`);
  return res.data;
};

// --- Likes ---
export const toggleLike = async (postId) => {
  const res = await api.post(`/posts/${postId}/like-toggle/`);
  return res.data;
};

// --- Comments ---
export const getComments = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments/`);
  return Array.isArray(res.data) ? res.data : [];
};

export const addComment = async (postId, body) => {
  const res = await api.post(`/posts/${postId}/comments/`, { body });
  return res.data;
};

export const updateComment = async (commentId, body) => {
  const res = await api.put(`/comments/${commentId}/`, { body });
  return res.data;
};

export const deleteComment = async (commentId) => {
  await api.delete(`/comments/${commentId}/`);
};