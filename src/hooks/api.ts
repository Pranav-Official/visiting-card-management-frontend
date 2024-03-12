import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const api = axios.create();

api.defaults.baseURL = BASE_URL;
api.defaults.headers.common['Content-Type'] = 'application/json';

export default api;
