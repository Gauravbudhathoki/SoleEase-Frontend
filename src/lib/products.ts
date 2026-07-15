import { api } from './api';
import { Product } from '@/types';

export const getProducts = () => api.get<Product[]>('/products');

export const getProductById = (id: string) => api.get<Product>(`/products/${id}`);
