import api from "./axios";

// --- Posts ---
export const getPosts = async () => {
  const res = await api.get("/posts/");
  return Array.isArray(res.data) ? res.data : [];
};

export const getPost = async (id) => {
  const res = await api.get(`/posts/${id}/`);
  return res.data;
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
  const res = await api.get("/categories/");
  return Array.isArray(res.data) ? res.data : [];
};

export const getCategoryDetails = async (id) => {
  const res = await api.get(`/categories/${id}/`);
  return res.data;
};

// --- Likes ---
export const toggleLike = async (postId) => {
  const res = await api.post(`/posts/${postId}/toggle-like/`);
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