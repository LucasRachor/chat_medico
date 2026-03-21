import axios, { AxiosInstance } from 'axios';
import * as https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const aiApi: AxiosInstance = axios.create({
  baseURL: process.env.IA_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
  httpsAgent,
});

export default aiApi;
