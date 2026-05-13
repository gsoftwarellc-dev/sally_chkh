import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
  updateProfile: (data) => api.put('/user/profile', data),
};

// Listings endpoints
export const listingsAPI = {
  getAll: (params) => api.get('/listings', { params }),
  getFeatured: () => api.get('/listings/featured'),
  getOne: (id) => api.get(`/listings/${id}`),
  create: (data) => api.post('/listings', data),
  update: (id, data) => api.put(`/listings/${id}`, data),
  delete: (id) => api.delete(`/listings/${id}`),
  saveListing: (id) => api.post(`/listings/${id}/save`),
  unsaveListing: (id) => api.delete(`/listings/${id}/save`),
  getSaved: () => api.get('/user/saved-listings'),
  getUserListings: () => api.get('/user/listings'),
};

// Categories endpoints
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Evaluations endpoints
export const evaluationsAPI = {
  submit: (data) => api.post('/evaluations', data),
  getAll: () => api.get('/evaluations'),
  getOne: (id) => api.get(`/evaluations/${id}`),
  getUserEvaluations: () => api.get('/user/evaluations'),
  updateStatus: (id, data) => api.put(`/evaluations/${id}/status`, data),
};

// Inquiries endpoints
export const inquiriesAPI = {
  create: (data) => api.post('/inquiries', data),
  getAll: () => api.get('/inquiries'),
  getUserInquiries: () => api.get('/user/inquiries'),
  updateStatus: (id, data) => api.put(`/inquiries/${id}/status`, data),
};

// Admin endpoints
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  updateUserRole: (id, data) => api.put(`/admin/users/${id}/role`, data),
  getAllListings: (params) => api.get('/admin/listings', { params }),
  updateListingStatus: (id, data) => api.put(`/admin/listings/${id}/status`, data),
  addNote: (listingId, data) => api.post(`/admin/listings/${listingId}/notes`, data),
  getEvaluations: () => api.get('/admin/evaluations'),
  getInquiries: () => api.get('/admin/inquiries'),
  getCategories: () => api.get('/admin/categories'),
};

// Contact
export const contactAPI = {
  send: (data) => api.post('/contact', data),
};

export default api;
