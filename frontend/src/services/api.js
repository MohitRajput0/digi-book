import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Resource Endpoints
export const getResources = () => api.get('/resources/');
export const getResourceById = (id) => api.get('/resources/' + id);
export const createResource = (resourceData, ownerId = 1) => 
  api.post('/resources/?owner_id=' + ownerId, resourceData);
export const deleteResource = (id) => api.delete('/resources/' + id);

// User Endpoints
export const getUsers = () => api.get('/users/');

export default api;