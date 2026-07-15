export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  sizes: number[];
  colors: string[];
  stock: number;
  images: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  color: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  size: number;
  color: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
