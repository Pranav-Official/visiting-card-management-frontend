import axios from 'axios';

const api = axios.create();
api.defaults.baseURL = 'http://192.168.29.126:3000';
api.defaults.headers.common['Content-Type'] = 'application/json';

export default api;
