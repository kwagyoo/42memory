import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT_URL,
});

client.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
