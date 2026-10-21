import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://green-tourism-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});