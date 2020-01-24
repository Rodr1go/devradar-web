import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backenddevradar.herokuapp.com'
});

export default api;