import axios from 'axios';

const apiInstance = axios.create({
	//   baseURL: '/api',
  baseURL: '/api/proxy',
  timeout: 10000,
});

export default apiInstance;
