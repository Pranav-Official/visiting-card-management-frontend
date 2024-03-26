import axios from 'axios';

const BASE_URL = 'https://api.replicate.com/v1';
const replicateApi = axios.create();

replicateApi.defaults.baseURL = BASE_URL;
replicateApi.defaults.headers.common['Content-Type'] = 'application/json';
replicateApi.defaults.headers.common[
  'Authorization'
] = `Token ${process.env.REPLICATE_API_TOKEN}`;

export default replicateApi;
