/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  specs?: { [key: string]: string };
  isBestseller?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  reviews?: Review[];
  stock: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}

export interface Transaction {
  id: string;
  type: 'add' | 'remove';
  title: string;
  date: string;
  amount: number;
}

export interface OrderStatus {
  status: 'pending' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  label: string;
  date: string;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'pending' | 'processing' | 'out_for_delivery';
  total: number;
  items: string[]; // Image URLs
  estimatedDelivery?: string;
  trackingNumber?: string;
  statusHistory?: OrderStatus[];
}
