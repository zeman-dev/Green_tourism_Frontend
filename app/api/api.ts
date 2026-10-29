import axios from 'axios';
import type { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const rawBaseUrl =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://green-tourism-backend.onrender.com/api';

const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, '');

const apiBaseUrl = normalizedBaseUrl.endsWith('/api')
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
