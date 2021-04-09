import { OrderStatus } from './order';

export interface AppContext {
  loggedIn: boolean;
}

export interface AppInitResponse {
  orderStatuses?: { [key: string]: OrderStatus };
  company?: { companyId: string; company: string };
  helps: Array<{ link: string; name: string }>;
  user?: {
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}
