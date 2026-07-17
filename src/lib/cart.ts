import { api } from './api';
import { Cart } from '@/types';

export const getCart = () => api.get<Cart>('/cart');

export const addToCart = (data: {
  productId: string;
  quantity: number;
  size: number;
  color: string;
}) => api.post<Cart>('/cart/add', data);

export const updateCartItem = (data: {
  productId: string;
  size: number;
  color: string;
  quantity: number;
}) => api.put<Cart>('/cart/update', data);

export const removeCartItem = (data: {
  productId: string;
  size: number;
  color: string;
}) => api.delete<Cart>('/cart/remove', data);
