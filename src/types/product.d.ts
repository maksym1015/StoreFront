import { Category } from './category';
import { SavedSearch } from './saved-search';
import { Search } from './search';
import { ViewTool } from './view-tool';
import { TaxDetail } from './tax';

export interface Product {
  id: string;
  code: string;
  name: string;
  updatedTimestamp: string;
  updatedPricingTimestamp: string;
  hasVat: boolean;
  price: number;
  inputPrice: number;
  displayPrice: number;
  logisticFee: number;
  status: string;
  categoryId: string;
  features: arry<any>;
  categoryIds: Array<number>;
  fullDescription: string;
  taxIds: Array<number>;
  qty: number | null;
  taxValue: number;
  subTotal: number;
  total: number;
  approved: string;
  mainPair: {
    id: string;
    imageId: string;
  } | null;
  image: string;
  categoryName?: string;
  availableFrom?: string;
}

export interface TopSkuProduct {
  amount: number;
  name: string;
  code: string;
  image?: string;
}

export interface ProductsResponse {
  products: Product[];
  categories: Category[];
  savedSearches: SavedSearch[];
  search: Search;
  filters: ProductFilterItem[];
}

export interface Destination {
  id: string;
  name: string;
  isAdmin?: number;
}

export interface ProductFilterItem {
  featureId: string;
  filter: string;
  filterId: string;
  variants: Array<{ variant: string; variantId: string }>;
}

export interface ProductFeature {
  featureId: string;
  featureType: string;
  description: string;
  value: string | null;
  valueInt: string | null;
  variantId: number | null;
  prefix: string;
  suffix: string;
  variants: Array<{ variant: string; variantId: string; selected: string }>;
}

export interface ProductDetailResponse {
  product: Product;
  viewTools: ViewTool;
  destinations: Destination[];
  activeRestrictions: Destination[];
  adminRestrictions: Destination[];
  taxes: TaxDetail[];
  selectedOptions: ProductOption[];
}

export interface ProductOption {
  optionId: string;
  optionName: string;
  selected?: boolean;
}
