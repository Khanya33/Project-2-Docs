import axios from 'axios';
import { getAuthHeader } from '@/utils/auth';
const api = axios.create({
  baseURL: '/api',
  headers: getAuthHeader()
});
export default api;