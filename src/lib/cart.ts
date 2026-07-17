import { api } from './api';
import { Cart } from '@/types';

export const getCart = () => api.get<Cart>('/cart');

export const addToCart = (data: {
  productId: string;
  quantity: number;
  size: number;
  color: string;
}) => api.post<Cart>('/cart/add', data);
