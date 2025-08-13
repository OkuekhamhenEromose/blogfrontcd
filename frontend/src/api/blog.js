import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access) {
    return { Authorization: 'Bearer ' + user.access };
  }
  return {};
};

export const getPosts = async () => {
  const response = await axios.get(API_URL + 'posts/', { headers: getAuthHeader() });
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(API_URL + `posts/${id}/`, { headers: getAuthHeader() });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(API_URL + 'posts/', postData, { headers: getAuthHeader() });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(API_URL + 'categories/', { headers: getAuthHeader() });
  return response.data;
};

export const getComments = async (postId) => {
  const response = await axios.get(API_URL + `posts/${postId}/comments/`, { headers: getAuthHeader() });
  return response.data;
};

export const addComment = async (postId, comment) => {
  const response = await axios.post(API_URL + `posts/${postId}/comments/add/`, { body: comment }, { headers: getAuthHeader() });
  return response.data;
};

export const toggleLike = async (postId) => {
  const response = await axios.post(API_URL + `posts/${postId}/like-toggle/`, {}, { headers: getAuthHeader() });
  return response.data;
};