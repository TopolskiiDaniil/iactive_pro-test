import axios from 'axios';

// Создаём экземпляр axios с базовым URL
const apiInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export default apiInstance;
