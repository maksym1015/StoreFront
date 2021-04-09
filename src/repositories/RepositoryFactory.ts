import AppRepository from './AppRepository';
import OrderRepository from './OrderRepository';
import ProductRepository from './ProductRepository';
import UserRepository from './UserRepository';
import ContentRepository from './ContentRepository';
import DashboardRepository from './DashboardRepository';
import DataExportRepository from './DataExportRepository';
import CompanyRepository from './CompanyRepository';
import CategoriesRepository from './CategoriesRepository';

const repositories = {
  app: AppRepository,
  order: OrderRepository,
  product: ProductRepository,
  user: UserRepository,
  outlet: UserRepository,
  content: ContentRepository,
  dashboard: DashboardRepository,
  dataExport: DataExportRepository,
  company: CompanyRepository,
  category: CategoriesRepository,
};

export const RepositoryFactory = {
  get<K extends keyof typeof repositories>(name: K) {
    return repositories[name];
  },
};
