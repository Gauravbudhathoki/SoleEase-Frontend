import { api } from './api';
import { Order, ShippingAddress } from '@/types';

export const createOrder = (shippingAddress: ShippingAddress) =>
  api.post<Order>('/orders', { shippingAddress });

export const getMyOrders = () => api.get<Order[]>('/orders/my-orders');

export const getOrderById = (id: string) => api.get<Order>(`/orders/${id}`);
