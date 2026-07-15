import { api } from './api';
import { AuthResponse } from '@/types';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterInput) =>
  api.post<AuthResponse>('/auth/register', data);

export const loginUser = (data: LoginInput) =>
  api.post<AuthResponse>('/auth/login', data);
