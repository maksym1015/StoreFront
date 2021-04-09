import { StringNullableChain } from 'lodash';

export interface User {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  status: string;
  outletStyle?: string;
  outletName?: string;
  address?: string;
  city?: string;
  county?: string;
  zipCode?: string;
}

export interface UserPricing {
  id: string;
  outletName: string;
  inputPrice: number;
  sellOutPrice: number;
  product: {
    code?: string;
    name: string;
    id: string;
  };
}
