// File: src/utils/api.js
// -----------------------------
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://socialmedia-kpk8.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Load token if present
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;

// Helpers
export const likePost = (postId) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.post(`/post/${postId}/like`, null, { headers });
};

export const dislikePost = (postId) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.post(`/post/${postId}/dislike`, null, { headers });
};
