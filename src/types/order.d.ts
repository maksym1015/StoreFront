import { Product } from './product';
import { Tax } from './tax';
import { Search, PaymentMethod, SavedSearch } from './index';

export interface Order {
  id: string;
  customer: {
    email: string;
    phone: string;
    lastName: string;
    firstName: string;
    fullName: string;
    outlet: string;
  };
  createdAt: string;
  date: string;
  status: string;
  total: number;
  subtotal: number;
}

export interface OrderStatus {
  status_id: string;
  status: string;
  description: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  address2: string;
  phone: string;
  city: string;
  zip: string;
  stateDescription: string;
  countryDescription: string;
  addressType: string;
}

export interface OrderDetails extends Order {
  id: string;
  createdAt: string;
  customer: {
    email: string;
    phone: string;
    ip: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  billing: Address;
  shipping: Address;
  paymentMethod: {
    name: string;
  };
  products: Product[];
  total: number;
  subtotal: number;
  status: string;
  taxes: Tax[];
  customerNotes: string;
  staffNotes: string;
}

export interface OrdersResponse {
  orders: Order[];
  search: Search;
  total: number;
  totalCompleted: number;
  paymentMethods: PaymentMethod[];
  savedSearches: SavedSearch[];
  productSavedSearches: SavedSearch[];
}
