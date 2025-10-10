import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiInstance = axios.create({
	baseURL: API_BASE_URL,
  timeout: 10000,
});

export default apiInstance;
