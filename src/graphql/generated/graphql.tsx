import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AbandonedCartsFilter = {
  created?: Maybe<DateFilter>;
  updated?: Maybe<DateFilter>;
};

export type AddItemToWishlist = {
  listId: Scalars['String'];
  productId: Scalars['Int'];
};

export type AdditionalDataInvoice = {
  __typename?: 'AdditionalDataInvoice';
  paymentId: Scalars['Int'];
  data?: Maybe<Invoice>;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  outletId?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo?: Maybe<Scalars['String']>;
  lineThree?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  county: Scalars['String'];
  postcode: Scalars['String'];
  country: Scalars['String'];
  type: Scalars['String'];
};

export type AdminAbandonedCartsInput = {
  search?: Maybe<Scalars['String']>;
  filters?: Maybe<AbandonedCartsFilter>;
  sort: Sort;
  pagination: DslAdminPagination;
};

export type AdminAbandonedCartsResponse = {
  __typename?: 'AdminAbandonedCartsResponse';
  totalCount: Scalars['Int'];
  carts?: Maybe<Array<DslCart>>;
};

export type AdminUsersParams = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  filters?: Maybe<Array<Maybe<DslAdminFilter>>>;
  sort?: Maybe<Sort>;
};

export type AdminUsersResponse = {
  __typename?: 'AdminUsersResponse';
  users: Array<Maybe<DslUser>>;
  totalCount: Scalars['Int'];
};

export type AuthDslResponse = {
  __typename?: 'AuthDslResponse';
  result: Scalars['Boolean'];
  notification?: Maybe<Scalars['String']>;
  user?: Maybe<DslUser>;
  dslCart?: Maybe<DslCart>;
  management?: Maybe<UserManagement>;
  outlets?: Maybe<Array<DslOutlet>>;
  currentOutlet?: Maybe<DslOutlet>;
};

export type AuthRequest = {
  username: Scalars['String'];
  password: Scalars['String'];
  guestID?: Maybe<Scalars['Int']>;
  vendorID?: Maybe<Scalars['Int']>;
  outletID?: Maybe<Scalars['Int']>;
  roleID?: Maybe<Scalars['Int']>;
};

export type BasicAdminListInput = {
  search?: Maybe<Scalars['String']>;
  sort: Sort;
  pagination: DslAdminPagination;
};

export type BulkActionError = {
  __typename?: 'BulkActionError';
  id?: Maybe<Array<Scalars['Int']>>;
  error: Scalars['String'];
};

export type BulkActionInput = {
  id?: Maybe<Array<Scalars['Int']>>;
  action: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type BulkActionResponse = {
  __typename?: 'BulkActionResponse';
  id?: Maybe<Array<Scalars['Int']>>;
  error?: Maybe<BulkActionError>;
};

export type CategoryInput = {
  category: DslCategoryInput;
  statusID?: Maybe<Scalars['Int']>;
};

export type CategoryInputResponse = {
  __typename?: 'CategoryInputResponse';
  category: DslCategory;
};

export type CategoryStructureInput = {
  category: DslCategoryInput;
  statusID?: Maybe<Scalars['Int']>;
  subCategories?: Maybe<Array<CategoryStructureInput>>;
};

export type Content = {
  __typename?: 'Content';
  id: Scalars['ID'];
  slug: Scalars['String'];
  type: Scalars['String'];
  title: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  media?: Maybe<Array<ContentMedia>>;
  custom?: Maybe<ContentCustomFields>;
};

export type ContentBrandStore = {
  __typename?: 'ContentBrandStore';
  name: Scalars['String'];
  slug: Scalars['String'];
  image: ContentImage;
  featured?: Maybe<Scalars['Boolean']>;
};

export type ContentBrandStoreDetail = {
  __typename?: 'ContentBrandStoreDetail';
  name: Scalars['String'];
  detail: Scalars['String'];
};

export type ContentButton = {
  __typename?: 'ContentButton';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ContentCustomFieldGroup = {
  __typename?: 'ContentCustomFieldGroup';
  groupName: Scalars['String'];
  items?: Maybe<Array<ContentCustomFieldGroupItem>>;
  subGroupItems?: Maybe<Array<ContentCustomFieldGroupItem>>;
};

export type ContentCustomFieldGroupItem = {
  __typename?: 'ContentCustomFieldGroupItem';
  image?: Maybe<ContentImage>;
  url?: Maybe<Scalars['String']>;
  internal?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  alt?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ContentCustomFieldImage = {
  __typename?: 'ContentCustomFieldImage';
  image: ContentImage;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  alt?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
};

export type ContentCustomFields = {
  __typename?: 'ContentCustomFields';
  group?: Maybe<Array<ContentCustomFieldGroup>>;
  images?: Maybe<Array<ContentCustomFieldImage>>;
  navigationAds?: Maybe<Array<ContentCustomFieldGroup>>;
  heroCta?: Maybe<ContentHeroCta>;
  brands?: Maybe<Array<ContentBrandStore>>;
  brandDetail?: Maybe<Array<ContentBrandStoreDetail>>;
  serviceCategory?: Maybe<ContentServiceCategory>;
  serviceProvider?: Maybe<ContentServiceProvider>;
};

export type ContentFilterParams = {
  contentType: Scalars['String'];
  slug: Scalars['String'];
  metaKey: Scalars['String'];
  metaValue: Scalars['String'];
  search: Scalars['String'];
  serviceCategory: Scalars['Int'];
};

export type ContentHeroCta = {
  __typename?: 'ContentHeroCta';
  image: ContentImage;
  title: Scalars['String'];
  description: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  primaryButton: ContentButton;
  secondaryButton: ContentButton;
};

export type ContentImage = {
  __typename?: 'ContentImage';
  url: Scalars['String'];
  focalPoint?: Maybe<ContentImageFocalPoint>;
};

export type ContentImageFocalPoint = {
  __typename?: 'ContentImageFocalPoint';
  top: Scalars['Float'];
  bottom: Scalars['Float'];
  right: Scalars['Float'];
  left: Scalars['Float'];
};

export type ContentMedia = {
  __typename?: 'ContentMedia';
  id: Scalars['ID'];
  altText?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  details?: Maybe<MediaDetails>;
};

export type ContentServiceCategory = {
  __typename?: 'ContentServiceCategory';
  description?: Maybe<Scalars['String']>;
  visible: Scalars['Boolean'];
  icon: Scalars['String'];
};

export type ContentServiceProvider = {
  __typename?: 'ContentServiceProvider';
  name: Scalars['String'];
  logo: ContentImage;
  national: Scalars['Boolean'];
  location: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  number: Scalars['String'];
  address: Scalars['String'];
  heroImage: ContentImage;
  details?: Maybe<Array<ContentServiceProviderDetail>>;
};

export type ContentServiceProviderDetail = {
  __typename?: 'ContentServiceProviderDetail';
  name: Scalars['String'];
  detail: Scalars['String'];
};

export type CreditEnquiry = {
  __typename?: 'CreditEnquiry';
  customerID: Scalars['String'];
  name: Scalars['String'];
  creditLimit: Scalars['Float'];
  balance: Scalars['Float'];
  overdueBalance: Scalars['Float'];
  rent: Scalars['Float'];
  other: Scalars['Float'];
  paymentFormula: Scalars['String'];
  paymentDate: Scalars['String'];
  days: Scalars['Int'];
  blocked: Scalars['Boolean'];
  settlementInvoices?: Maybe<Array<Invoice>>;
  balanceInvoices?: Maybe<Array<Invoice>>;
};

export type CreditEnquiryResponse = {
  __typename?: 'CreditEnquiryResponse';
  credit: CreditEnquiry;
  orderManaged: Scalars['Boolean'];
  cashWithOrder: Scalars['Boolean'];
};

export type DateFilter = {
  period?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
};

export type DeleteEntityRelationshipInput = {
  entity: EntityMap;
  relationshipType: Scalars['String'];
};

export type DeleteOutletProductPriceOverrides = {
  outletId: Scalars['Int'];
};

export type Depot = {
  customerId: Scalars['ID'];
  depotCode: Scalars['String'];
};

export type DslAdminFilter = {
  name: Scalars['String'];
  values: Array<Maybe<Scalars['String']>>;
};

export type DslAdminPagination = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
};

export type DslAdminProductsResponse = {
  __typename?: 'DslAdminProductsResponse';
  totalCount: Scalars['Int'];
  products?: Maybe<Array<DslProduct>>;
};

export type DslBrand = {
  __typename?: 'DslBrand';
  id: Scalars['Int'];
  status: Status;
  displayName: Scalars['String'];
  slug: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  mainEmail?: Maybe<Scalars['String']>;
  ccEmail?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  installEmail?: Maybe<Scalars['String']>;
  pumpClipEmail?: Maybe<Scalars['String']>;
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type DslCart = {
  __typename?: 'DslCart';
  id: Scalars['ID'];
  userId: Scalars['Int'];
  OutletId: Scalars['Int'];
  guestId: Scalars['Int'];
  totalProducts: Scalars['Int'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  products?: Maybe<Array<DslCartProduct>>;
  totals: DslCartTotal;
  qualifiedPromotions?: Maybe<Array<Maybe<PromotionResult>>>;
  user?: Maybe<DslUser>;
  outlet?: Maybe<DslOutlet>;
};

export type DslCartProduct = {
  __typename?: 'DslCartProduct';
  id: Scalars['ID'];
  cartId: Scalars['Int'];
  productId: Scalars['Int'];
  qty: Scalars['Int'];
  lastKnownPrice: Scalars['Float'];
  product: DslProduct;
};

export type DslCartProductInput = {
  productId: Scalars['Int'];
  qty: Scalars['Int'];
};

export type DslCartTotal = {
  __typename?: 'DslCartTotal';
  subtotal: Scalars['Int'];
  discount: Scalars['Int'];
  tax: Scalars['Int'];
  total: Scalars['Int'];
};

export type DslCategory = {
  __typename?: 'DslCategory';
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['Int']>;
  status: Status;
  name: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoKeywords?: Maybe<Scalars['String']>;
  seoSlug?: Maybe<Scalars['String']>;
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  code: Scalars['String'];
  subCategories?: Maybe<Array<Maybe<DslCategory>>>;
  totalProducts: Scalars['Int'];
};

export type DslCategoryInput = {
  parentId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoKeywords?: Maybe<Scalars['String']>;
  seoSlug?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type DslFilter = {
  __typename?: 'DslFilter';
  id: Scalars['ID'];
  name: Scalars['String'];
  options?: Maybe<Array<Scalars['String']>>;
};

export type DslOrder = {
  __typename?: 'DslOrder';
  id: Scalars['Int'];
  status: Status;
  userId: Scalars['Int'];
  subtotal: Scalars['Int'];
  discount: Scalars['Int'];
  total: Scalars['Int'];
  totalTax: Scalars['Int'];
  notes: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  company: Scalars['String'];
  billingLine1: Scalars['String'];
  billingLine2: Scalars['String'];
  billingLine3: Scalars['String'];
  billingCity: Scalars['String'];
  billingCounty: Scalars['String'];
  billingPostcode: Scalars['String'];
  billingCountry: Scalars['String'];
  shippingLine1: Scalars['String'];
  shippingLine2: Scalars['String'];
  shippingLine3: Scalars['String'];
  shippingCity: Scalars['String'];
  shippingCounty: Scalars['String'];
  shippingPostcode: Scalars['String'];
  shippingCountry: Scalars['String'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  outletId: Scalars['Int'];
  orderItems: Array<DslOrderItem>;
  payments?: Maybe<Array<OrderPayment>>;
  additionalData?: Maybe<DslOrderAdditionalData>;
};

export type DslOrderAdditionalData = {
  __typename?: 'DslOrderAdditionalData';
  invoices?: Maybe<Array<AdditionalDataInvoice>>;
  deliveryDate?: Maybe<Scalars['String']>;
};

export type DslOrderInput = {
  notes?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  billingLine1: Scalars['String'];
  billingLine2?: Maybe<Scalars['String']>;
  billingLine3?: Maybe<Scalars['String']>;
  billingCity: Scalars['String'];
  billingCounty?: Maybe<Scalars['String']>;
  billingPostcode: Scalars['String'];
  billingCountry: Scalars['String'];
  shippingLine1: Scalars['String'];
  shippingLine2?: Maybe<Scalars['String']>;
  shippingLine3?: Maybe<Scalars['String']>;
  shippingCity: Scalars['String'];
  shippingCounty?: Maybe<Scalars['String']>;
  shippingPostcode: Scalars['String'];
  shippingCountry: Scalars['String'];
  /** outletId is temporary, this should be obtained via the current context */
  outletId?: Maybe<Scalars['Int']>;
  payments?: Maybe<Array<OrderPaymentInput>>;
  deliveryDate?: Maybe<Scalars['String']>;
};

export type DslOrderItem = {
  __typename?: 'DslOrderItem';
  id: Scalars['Int'];
  orderId: Scalars['Int'];
  productId: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
  code: Scalars['String'];
  weight: Scalars['Float'];
  boxLength: Scalars['Float'];
  boxWidth: Scalars['Float'];
  boxHeight: Scalars['Float'];
  price: Scalars['Int'];
  qty: Scalars['Int'];
  total: Scalars['Int'];
  totalTax: Scalars['Int'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  product?: Maybe<DslProduct>;
  associations?: Maybe<OrderItemAssociations>;
};

export type DslOrderPaymentInput = {
  orderId: Scalars['Int'];
  payment: OrderPaymentInput;
};

export type DslOrderResponse = {
  __typename?: 'DslOrderResponse';
  totalCount: Scalars['Int'];
  orders?: Maybe<Array<DslOrder>>;
  filters?: Maybe<Array<DslFilter>>;
};

export type DslOutlet = {
  __typename?: 'DslOutlet';
  id: Scalars['ID'];
  status: Status;
  name: Scalars['String'];
  style: Scalars['String'];
  legalStatus: Scalars['String'];
  companyName: Scalars['String'];
  companyNumber: Scalars['String'];
  charityNumber: Scalars['String'];
  dropPointDescription: Scalars['String'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  addressBook: OutletAddressBook;
  outletUsers?: Maybe<Array<OutletUser>>;
  lastOrdered?: Maybe<Scalars['String']>;
  outletType: Scalars['String'];
  features: DslOutletFeatures;
  deliveryDays?: Maybe<Array<OutletDeliveryDay>>;
  userRole?: Maybe<Scalars['String']>;
};

export type DslOutletFeatures = {
  __typename?: 'DslOutletFeatures';
  cashWithOrder: Scalars['Boolean'];
};

export type DslProduct = {
  __typename?: 'DslProduct';
  id: Scalars['ID'];
  status: Status;
  type: Scalars['String'];
  name: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  mrrp: Scalars['Float'];
  popularity: Scalars['Float'];
  searchWords: Scalars['String'];
  seoTitle: Scalars['String'];
  seoDescription: Scalars['String'];
  seoKeywords: Scalars['String'];
  seoSlug: Scalars['String'];
  weight: Scalars['Float'];
  boxLength: Scalars['Float'];
  boxWidth: Scalars['Float'];
  boxHeight: Scalars['Float'];
  featured: Scalars['Boolean'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  features?: Maybe<Array<DslProductFeature>>;
  options?: Maybe<Array<DslProductOption>>;
  price: Price;
  promotions?: Maybe<Array<Promotion>>;
  mainImage?: Maybe<DslProductImage>;
  additionalImages?: Maybe<Array<DslProductImage>>;
  onWishlist: Scalars['Boolean'];
  variations?: Maybe<Array<Maybe<ProductVariation>>>;
  taxCode?: Maybe<TaxCode>;
  associations?: Maybe<ProductAssociations>;
  categories?: Maybe<Array<DslCategory>>;
};

export type DslProductAdminParams = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  filters?: Maybe<Array<Maybe<DslAdminFilter>>>;
  sort?: Maybe<Sort>;
};

export type DslProductFeature = {
  __typename?: 'DslProductFeature';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
  description: Scalars['String'];
  featured: Scalars['Boolean'];
  filterable: Scalars['Boolean'];
  position: Scalars['Int'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type DslProductFeatureInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  value: Scalars['String'];
  description: Scalars['String'];
  featured: Scalars['Boolean'];
  filterable: Scalars['Boolean'];
  position: Scalars['Int'];
};

export type DslProductImage = {
  __typename?: 'DslProductImage';
  id: Scalars['ID'];
  productId: Scalars['Int'];
  type: Scalars['String'];
  fullSizePath: Scalars['String'];
  thumbnailPath: Scalars['String'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type DslProductImageInput = {
  id: Scalars['Int'];
  type: Scalars['String'];
  fullSizePath: Scalars['String'];
  thumbnailPath: Scalars['String'];
};

export type DslProductOption = {
  __typename?: 'DslProductOption';
  id: Scalars['ID'];
  productId: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  icon: Scalars['String'];
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type DslProductOptionInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  icon: Scalars['String'];
};

export type DslProductPrice = {
  __typename?: 'DslProductPrice';
  productId: Scalars['Int'];
  subtotal: Scalars['Float'];
  vat: Scalars['Float'];
  discount: Scalars['Float'];
  total: Scalars['Float'];
};

export type DslProductPriceInput = {
  type: Scalars['String'];
  value: Scalars['Float'];
  override?: Maybe<Scalars['Float']>;
  position: Scalars['Int'];
  isTax?: Maybe<Scalars['Boolean']>;
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
};

export type DslProductsResponse = {
  __typename?: 'DslProductsResponse';
  totalCount: Scalars['Int'];
  products?: Maybe<Array<DslProduct>>;
  filters?: Maybe<Array<DslFilter>>;
};

export type DslUser = {
  __typename?: 'DslUser';
  id: Scalars['Int'];
  type: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  marketing: Scalars['Boolean'];
  identities?: Maybe<Array<Maybe<UserIdentity>>>;
  status?: Maybe<Status>;
  outlets?: Maybe<Array<DslOutlet>>;
  createdOn: Scalars['String'];
  lastLogin: Scalars['String'];
  lastOrdered: Scalars['String'];
};

export type DslUserInput = {
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  marketing: Scalars['Boolean'];
  type?: Maybe<Scalars['String']>;
};

export type Entity = {
  __typename?: 'Entity';
  id: Scalars['Int'];
  name: Scalars['String'];
  typeID: Scalars['Int'];
  parentEntityTypeID: Scalars['Int'];
  created: Scalars['String'];
};

export type EntityMap = {
  id: Scalars['Int'];
  dataType: Scalars['String'];
};

export type EntityType = {
  __typename?: 'EntityType';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  created: Scalars['String'];
};

export type GetEtlOrderInput = {
  orderId: Scalars['Int'];
};

export type GetEtlOrderResponse = {
  __typename?: 'GetETLOrderResponse';
  order?: Maybe<DslOrder>;
};

export type GetSimilarProductsResponse = {
  __typename?: 'GetSimilarProductsResponse';
  products?: Maybe<Array<DslProduct>>;
};

export type GetYouMightAlsoLikeProductsResponse = {
  __typename?: 'GetYouMightAlsoLikeProductsResponse';
  products?: Maybe<Array<DslProduct>>;
};

export type InsertAddress = {
  title: Scalars['String'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo: Scalars['String'];
  lineThree: Scalars['String'];
  city: Scalars['String'];
  county: Scalars['String'];
  postcode: Scalars['String'];
  country: Scalars['String'];
};

export type InsertBrandOwnerInput = {
  name: Scalars['String'];
};

export type InsertDistributionDepotsInput = {
  distributorId: Scalars['Int'];
  depots?: Maybe<Array<Depot>>;
};

export type InsertEntityInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  entityTypeId?: Maybe<Scalars['Int']>;
};

export type InsertEntityRelationshipInput = {
  entity: EntityMap;
  relatedEntity: EntityMap;
  relatedParentEntity?: Maybe<EntityMap>;
};

export type InsertEntityTypeInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type InsertLogisticFeeResponse = {
  __typename?: 'InsertLogisticFeeResponse';
  fee: LogisticsFee;
};

export type InsertLogisticsFeeInput = {
  name: Scalars['String'];
  statusId: Scalars['Int'];
  logisticsTypeId: Scalars['Int'];
  fee: Scalars['Float'];
};

export type InsertOutlet = {
  name: Scalars['String'];
  style: Scalars['String'];
  legalStatus: Scalars['String'];
  companyName: Scalars['String'];
  companyNumber: Scalars['String'];
  charityNumber: Scalars['String'];
  dropPointDescription: Scalars['String'];
};

export type InsertOutletInput = {
  outlet: InsertOutlet;
  shippingAddress: InsertAddress;
  billingAddress?: Maybe<InsertAddress>;
  statusId?: Maybe<Scalars['Int']>;
  typeName?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Scalars['String']>>;
};

export type InsertOutletResponse = {
  __typename?: 'InsertOutletResponse';
  outlet: DslOutlet;
};

export type InsertProduct = {
  name: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  statusId?: Maybe<Scalars['Int']>;
  code: Scalars['String'];
  mrrp: Scalars['Float'];
  popularity: Scalars['Float'];
  searchWords: Scalars['String'];
  seoTitle: Scalars['String'];
  seoDescription: Scalars['String'];
  seoKeywords: Scalars['String'];
  seoSlug: Scalars['String'];
  weight: Scalars['Float'];
  boxLength: Scalars['Float'];
  boxWidth: Scalars['Float'];
  boxHeight: Scalars['Float'];
  featured: Scalars['Boolean'];
  features?: Maybe<Array<DslProductFeatureInput>>;
  options?: Maybe<Array<DslProductOptionInput>>;
  pricing?: Maybe<Array<Maybe<DslProductPriceInput>>>;
  mainImage?: Maybe<DslProductImageInput>;
  additionalImages?: Maybe<Array<DslProductImageInput>>;
};

export type InsertProductFeatureInput = {
  data?: Maybe<ProductFeatureInput>;
};

export type InsertProductInput = {
  product: InsertProduct;
  categoryId: Scalars['Int'];
  taxCodeId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  vendorId?: Maybe<Scalars['Int']>;
  distributorId?: Maybe<Scalars['Int']>;
  relatedEntities?: Maybe<Array<InsertEntityRelationshipInput>>;
};

export type InsertProductPrice = {
  type: Scalars['String'];
  value: Scalars['Float'];
  position: Scalars['Int'];
  isTax?: Maybe<Scalars['Boolean']>;
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
};

export type InsertProductPriceOverrideInput = {
  productId: Scalars['ID'];
  userId?: Maybe<Scalars['Int']>;
  outletId?: Maybe<Scalars['Int']>;
  pricing?: Maybe<Array<ProductPriceOverrideInput>>;
};

export type InsertProductPriceOverrideResponse = {
  __typename?: 'InsertProductPriceOverrideResponse';
  productId: Scalars['ID'];
  userId?: Maybe<Scalars['Int']>;
  entityId?: Maybe<Scalars['Int']>;
  pricing?: Maybe<Array<ProductPriceOverride>>;
};

export type InsertProductResponse = {
  __typename?: 'InsertProductResponse';
  product: DslProduct;
};

export type InsertProductVariationsInput = {
  productId: Scalars['Int'];
};

export type InsertProductVariationsResponse = {
  __typename?: 'InsertProductVariationsResponse';
  temp: Scalars['String'];
};

export type InsertSupportDocumentInput = {
  data?: Maybe<SupportDocumentData>;
  statusId: Scalars['Int'];
};

export type InsertSupportDocumentResponse = {
  __typename?: 'InsertSupportDocumentResponse';
  document?: Maybe<SupportDocument>;
};

export type InsertUserInput = {
  user: DslUserInput;
};

export type InsertUserOutletRoleInput = {
  userId: Scalars['Int'];
  outletId: Scalars['Int'];
  role: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  postingDate: Scalars['String'];
  documentType: Scalars['String'];
  documentNumber: Scalars['String'];
  amount: Scalars['Float'];
  remainingAmount: Scalars['Float'];
  amountLCY: Scalars['Float'];
  remainingAmountLCY: Scalars['Float'];
  open: Scalars['Boolean'];
  dueDate: Scalars['String'];
  description: Scalars['String'];
  onHold: Scalars['String'];
  entryNo: Scalars['String'];
  settlementPlanNumber: Scalars['String'];
  settlementPlanRegistered: Scalars['Boolean'];
};

export type LinkedProductsResponse = {
  __typename?: 'LinkedProductsResponse';
  youMightAlsoLike?: Maybe<Array<DslProduct>>;
  similar?: Maybe<Array<DslProduct>>;
};

export type LogisticsFee = {
  __typename?: 'LogisticsFee';
  id: Scalars['Int'];
  name: Scalars['String'];
  logisticsType: Scalars['String'];
  status: Status;
  fee: Scalars['Float'];
};

export type LogisticsFeesParams = {
  query?: Maybe<Scalars['String']>;
  statusId?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sort>;
  pagination: DslAdminPagination;
};

export type LogisticsFeesResponse = {
  __typename?: 'LogisticsFeesResponse';
  fees: Array<LogisticsFee>;
  totalCount: Scalars['Int'];
};

export type MediaDetails = {
  __typename?: 'MediaDetails';
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  sizes?: Maybe<MediaSizes>;
};

export type MediaSize = {
  __typename?: 'MediaSize';
  file: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  mimeType: Scalars['String'];
  url: Scalars['String'];
};

export type MediaSizes = {
  __typename?: 'MediaSizes';
  medium?: Maybe<MediaSize>;
  large?: Maybe<MediaSize>;
  thumbnail?: Maybe<MediaSize>;
  mediumLarge?: Maybe<MediaSize>;
  postThumbnail?: Maybe<MediaSize>;
  full?: Maybe<MediaSize>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Can be used to register a new user on the system. This is tenant specific and may not be enabled for all tenants. You
   * will receive an error message if you try to register a new user for a tenant with this functionality turned off.
   */
  dslRegisterUser: AuthDslResponse;
  /** Registers an outlet. */
  registerOutlet: InsertOutletResponse;
  /**
   * Provide new details for an already existing user. This is an absolute change so if no details for the given user in
   * the UserUpdate object are changing, then the initial values **still need to be supplied**, otherwise they will be set
   * to `null`.
   */
  dslUpdateUser: UpdateUserResponse;
  /** Udpates the outlet. Currently, only the name can be changed. */
  updateOutlet: UpdateOutletResponse;
  /** Sets the current user's outlet to the one supplied. */
  setUserOutlet: SetUserOutletResponse;
  /** Attempts to log in the user with the supplied credentials. Will return a result if successful or `false` if not. */
  dslLogin: AuthDslResponse;
  /** Logs out the user and will destroy their `access_token`. */
  logout: Scalars['Boolean'];
  /** This will refresh the current user's session if one is found. */
  dslRefresh: Scalars['Boolean'];
  /** Triggers the password reset process if an identity is found. */
  dslPasswordRecovery: Scalars['Boolean'];
  /** Allows resetting of a password with a token. This will *not* log the user in. */
  resetPasswordWithToken: Scalars['Boolean'];
  /** Allows the user to update their password. */
  dslUpdateUserPassword: Scalars['Boolean'];
  /**
   * Can be used to add, update or remove products from a cart. The supplied array of DslCartProductInput items are
   * processed in place; so adding, updating and removing can all be sent as part of a single request if desired. It does
   * not matter if a cart for the current user context exists or not.
   */
  dslUpdateCart?: Maybe<DslCart>;
  /** Will place an order for the current user. Will fail if no user is currently logged in or doesn't have a cart. */
  dslPlaceOrder: DslOrder;
  /** Will create an order payment for an existing order, if successful it will return the payment id */
  dslCreateOrderPayment: Scalars['Int'];
  /** This will queue an installation request email for the current user to the brand owner of the given product id. */
  dslInstallationRequest: Scalars['Boolean'];
  /** Creates a new wishlist. */
  newWishlist: Wishlist;
  /** Deletes the supplied wishlist. */
  deleteWishlist: Scalars['Boolean'];
  /** Adds an item to the wishlist. */
  addItemToWishlist?: Maybe<Wishlist>;
  /** Removes an item from a wishlist. */
  deleteItemFromWishlist?: Maybe<Wishlist>;
  /** TODO: These product mutations currently point to the brand owner specific interface */
  insertProduct: InsertProductResponse;
  updateProduct: UpdateProductResponse;
  deleteProductByID: Scalars['Boolean'];
  insertProductVariations: InsertProductVariationsResponse;
  updateProductVariations: UpdateProductVariationsResponse;
  deleteProductVariations: Scalars['Boolean'];
  insertAdminUser: DslUser;
  updateAdminUser: DslUser;
  deleteAdminUser: Scalars['Boolean'];
  /**
   * This will trigger the password recovery process on behalf of a user. They
   * will receive an email with a reset link within.
   */
  sendUserPasswordRecovery: Scalars['Boolean'];
  updateAdminUserPassword: Scalars['Boolean'];
  setUserOutletRole: Scalars['Boolean'];
  calculatePricing: Scalars['Boolean'];
  insertDistributor: Entity;
  deleteDistributor: Scalars['Boolean'];
  insertCustomer: Entity;
  deleteCustomer: Scalars['Boolean'];
  insertEntity: Entity;
  insertEntityType: EntityType;
  insertAdminOutlet: InsertOutletResponse;
  updateAdminOutlet: UpdateOutletResponse;
  insertCategory: CategoryInputResponse;
  insertCategoryStructure?: Maybe<Array<Maybe<DslCategory>>>;
  insertTaxCode: TaxCode;
  insertTaxCodes?: Maybe<Array<TaxCode>>;
  updateTaxCode: TaxCode;
  deleteTaxCodeById: Scalars['Boolean'];
  deleteTaxCodeByCode: Scalars['Boolean'];
  insertAdminSupportDocument: SupportDocument;
  updateAdminSupportDocument: SupportDocument;
  deleteAdminSupportDocumentByID: Scalars['Boolean'];
  updateStarStockCompanyDetails: StarStockCompanyDetails;
  insertAdminLogisticsFee: InsertLogisticFeeResponse;
  updateAdminLogisticsFee: UpdateLogisticFeeResponse;
  deleteAdminLogisticsFeeByID: Scalars['Boolean'];
  updateAdminSimilarProducts: UpdateSimilarProductsResponse;
  updateAdminYouMightAlsoLikeProducts: UpdateYouMightAlsoLikeProductsResponse;
  bulkActionDelete?: Maybe<BulkActionResponse>;
  insertProductFeature?: Maybe<DslProductFeature>;
  updateProductFeature?: Maybe<DslProductFeature>;
  /** Prodocut data */
  insertETLProduct: InsertProductResponse;
  updateETLProduct: UpdateProductResponse;
  deleteETLProductByID: Scalars['Boolean'];
  /** Used to set customer pricing against a product */
  insertETLProductPriceOverride: InsertProductPriceOverrideResponse;
  deleteETLOutletProductPriceOverrides: Scalars['Boolean'];
  /** Used to define vendor & distributor product associations */
  updateETLProductAssociations: Scalars['Boolean'];
  /** User Roles are imported as entities */
  insertETLUserRole: Entity;
  /** Depots are imported as entities */
  insertETLDepot: Entity;
  deleteETLDepot: Scalars['Boolean'];
  /** Vendors are imported as brand owners */
  insertETLVendor: DslBrand;
  deleteETLVendor: Scalars['Boolean'];
  /** Distributors are imported as brand owners */
  insertETLDistributor: DslBrand;
  deleteETLDistributor: Scalars['Boolean'];
  /** Insert distribution depots */
  insertETLDistributionDepots: Scalars['Boolean'];
  /** Nav Customers are imported as Outlets */
  insertETLOutlet: InsertOutletResponse;
  updateETLOutlet: UpdateOutletResponse;
  /** Nav Users are imported as Users */
  insertETLUser: DslUser;
  updateETLUser: DslUser;
  /**
   * This assigns entity relationships
   * The ETL requires this to relate entities together for the distribution matrix
   */
  insertETLEntityRelationship: Scalars['Boolean'];
  /**
   * This will remove relationships based on type for the specified entity
   * The ETL uses this to clear outlet relationships
   */
  deleteETLEntityRelationships: Scalars['Boolean'];
  /**
   * Update an orders status
   * The ETL will call this mutation when an order status is updated in Nav
   */
  updateETLOrderStatus: Scalars['Boolean'];
};

export type MutationDslRegisterUserArgs = {
  input: UserRegistrationInput;
};

export type MutationRegisterOutletArgs = {
  input: InsertOutletInput;
};

export type MutationDslUpdateUserArgs = {
  input: UserUpdateInput;
};

export type MutationUpdateOutletArgs = {
  input: UpdateOutletInput;
};

export type MutationSetUserOutletArgs = {
  input: SetUserOutletInput;
};

export type MutationDslLoginArgs = {
  authRequest: AuthRequest;
};

export type MutationDslPasswordRecoveryArgs = {
  identity: Scalars['String'];
};

export type MutationResetPasswordWithTokenArgs = {
  input: ResetPasswordInput;
};

export type MutationDslUpdateUserPasswordArgs = {
  input: UpdatePasswordInput;
};

export type MutationDslUpdateCartArgs = {
  products: Array<DslCartProductInput>;
};

export type MutationDslPlaceOrderArgs = {
  input: DslOrderInput;
};

export type MutationDslCreateOrderPaymentArgs = {
  input: DslOrderPaymentInput;
};

export type MutationDslInstallationRequestArgs = {
  productId: Scalars['ID'];
};

export type MutationNewWishlistArgs = {
  wishlist: NewWishlist;
};

export type MutationDeleteWishlistArgs = {
  id: Scalars['String'];
};

export type MutationAddItemToWishlistArgs = {
  item: AddItemToWishlist;
};

export type MutationDeleteItemFromWishlistArgs = {
  listId: Scalars['String'];
  itemId: Scalars['Int'];
};

export type MutationInsertProductArgs = {
  input: InsertProductInput;
};

export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

export type MutationDeleteProductByIdArgs = {
  id: Scalars['Int'];
};

export type MutationInsertProductVariationsArgs = {
  input?: Maybe<InsertProductVariationsInput>;
};

export type MutationUpdateProductVariationsArgs = {
  input?: Maybe<UpdateProductVariationsInput>;
};

export type MutationDeleteProductVariationsArgs = {
  productId: Scalars['Int'];
};

export type MutationInsertAdminUserArgs = {
  input: InsertUserInput;
};

export type MutationUpdateAdminUserArgs = {
  input: UpdateUserInput;
};

export type MutationDeleteAdminUserArgs = {
  userId: Scalars['Int'];
};

export type MutationSendUserPasswordRecoveryArgs = {
  userId: Scalars['Int'];
};

export type MutationUpdateAdminUserPasswordArgs = {
  input: UpdateAdminUserPasswordInput;
};

export type MutationSetUserOutletRoleArgs = {
  input: InsertUserOutletRoleInput;
};

export type MutationCalculatePricingArgs = {
  productId: Scalars['Int'];
};

export type MutationInsertDistributorArgs = {
  input: InsertEntityInput;
};

export type MutationDeleteDistributorArgs = {
  distributorId: Scalars['Int'];
};

export type MutationInsertCustomerArgs = {
  input: InsertEntityInput;
};

export type MutationDeleteCustomerArgs = {
  customerId: Scalars['Int'];
};

export type MutationInsertEntityArgs = {
  input: InsertEntityInput;
};

export type MutationInsertEntityTypeArgs = {
  input: InsertEntityTypeInput;
};

export type MutationInsertAdminOutletArgs = {
  input: InsertOutletInput;
};

export type MutationUpdateAdminOutletArgs = {
  input: UpdateAdminOutletInput;
};

export type MutationInsertCategoryArgs = {
  input: CategoryInput;
};

export type MutationInsertCategoryStructureArgs = {
  categories?: Maybe<Array<Maybe<CategoryStructureInput>>>;
};

export type MutationInsertTaxCodeArgs = {
  input: TaxCodeInput;
};

export type MutationInsertTaxCodesArgs = {
  input?: Maybe<Array<TaxCodeInput>>;
};

export type MutationUpdateTaxCodeArgs = {
  input: TaxCodeInput;
};

export type MutationDeleteTaxCodeByIdArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteTaxCodeByCodeArgs = {
  code: Scalars['String'];
};

export type MutationInsertAdminSupportDocumentArgs = {
  input?: Maybe<InsertSupportDocumentInput>;
};

export type MutationUpdateAdminSupportDocumentArgs = {
  input?: Maybe<UpdateSupportDocumentInput>;
};

export type MutationDeleteAdminSupportDocumentByIdArgs = {
  supportDocumentID: Scalars['Int'];
};

export type MutationUpdateStarStockCompanyDetailsArgs = {
  input?: Maybe<UpdateStarStockCompanyDetailsInput>;
};

export type MutationInsertAdminLogisticsFeeArgs = {
  input: InsertLogisticsFeeInput;
};

export type MutationUpdateAdminLogisticsFeeArgs = {
  input: UpdateLogisticsFeeInput;
};

export type MutationDeleteAdminLogisticsFeeByIdArgs = {
  logisticsFeeId: Scalars['Int'];
};

export type MutationUpdateAdminSimilarProductsArgs = {
  input: UpdateSimilarProductsInput;
};

export type MutationUpdateAdminYouMightAlsoLikeProductsArgs = {
  input: UpdateYouMightAlsoLikeProductsInput;
};

export type MutationBulkActionDeleteArgs = {
  input?: Maybe<BulkActionInput>;
};

export type MutationInsertProductFeatureArgs = {
  input?: Maybe<InsertProductFeatureInput>;
};

export type MutationUpdateProductFeatureArgs = {
  input?: Maybe<UpdateProductFeatureInput>;
};

export type MutationInsertEtlProductArgs = {
  input: InsertProductInput;
};

export type MutationUpdateEtlProductArgs = {
  input: UpdateProductInput;
};

export type MutationDeleteEtlProductByIdArgs = {
  id: Scalars['Int'];
};

export type MutationInsertEtlProductPriceOverrideArgs = {
  input: InsertProductPriceOverrideInput;
};

export type MutationDeleteEtlOutletProductPriceOverridesArgs = {
  input: DeleteOutletProductPriceOverrides;
};

export type MutationUpdateEtlProductAssociationsArgs = {
  input?: Maybe<Array<ProductAssociationInput>>;
};

export type MutationInsertEtlUserRoleArgs = {
  input: InsertEntityInput;
};

export type MutationInsertEtlDepotArgs = {
  input: InsertEntityInput;
};

export type MutationDeleteEtlDepotArgs = {
  depotId: Scalars['Int'];
};

export type MutationInsertEtlVendorArgs = {
  input: InsertBrandOwnerInput;
};

export type MutationDeleteEtlVendorArgs = {
  vendorId: Scalars['Int'];
};

export type MutationInsertEtlDistributorArgs = {
  input: InsertBrandOwnerInput;
};

export type MutationDeleteEtlDistributorArgs = {
  distributorId: Scalars['Int'];
};

export type MutationInsertEtlDistributionDepotsArgs = {
  input: InsertDistributionDepotsInput;
};

export type MutationInsertEtlOutletArgs = {
  input: InsertOutletInput;
};

export type MutationUpdateEtlOutletArgs = {
  input: UpdateAdminOutletInput;
};

export type MutationInsertEtlUserArgs = {
  input: InsertUserInput;
};

export type MutationUpdateEtlUserArgs = {
  input: UpdateUserInput;
};

export type MutationInsertEtlEntityRelationshipArgs = {
  input: InsertEntityRelationshipInput;
};

export type MutationDeleteEtlEntityRelationshipsArgs = {
  input: DeleteEntityRelationshipInput;
};

export type MutationUpdateEtlOrderStatusArgs = {
  input: UpdateEtlOrderStatusInput;
};

export type NewWishlist = {
  name: Scalars['String'];
};

export type OrderFilters = {
  number?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  price?: Maybe<PriceFilter>;
  date?: Maybe<DateFilter>;
};

export type OrderInvoiceInput = {
  postingDate: Scalars['String'];
  documentType: Scalars['String'];
  documentNumber: Scalars['String'];
  amount: Scalars['Float'];
  remainingAmount: Scalars['Float'];
  amountLCY: Scalars['Float'];
  remainingAmountLCY: Scalars['Float'];
  open: Scalars['Boolean'];
  dueDate: Scalars['String'];
  description: Scalars['String'];
  onHold: Scalars['String'];
  entryNo: Scalars['String'];
  settlementPlanNumber: Scalars['String'];
  settlementPlanRegistered: Scalars['Boolean'];
};

export type OrderItemAssociation = {
  __typename?: 'OrderItemAssociation';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type OrderItemAssociations = {
  __typename?: 'OrderItemAssociations';
  vendor?: Maybe<OrderItemAssociation>;
  distributor?: Maybe<OrderItemAssociation>;
  depot: Scalars['String'];
};

export type OrderPayment = {
  __typename?: 'OrderPayment';
  id: Scalars['Int'];
  orderId: Scalars['Int'];
  status: Status;
  paymentType: Scalars['String'];
  reference: Scalars['String'];
  method: Scalars['String'];
  value: Scalars['Float'];
};

export type OrderPaymentInput = {
  statusValue: Scalars['Int'];
  paymentType: Scalars['String'];
  reference: Scalars['String'];
  method: Scalars['String'];
  value: Scalars['Float'];
  /** Provide invoices here so they will be assigned to the payment */
  invoices?: Maybe<Array<OrderInvoiceInput>>;
};

export type OutletAddressBook = {
  __typename?: 'OutletAddressBook';
  id: Scalars['Int'];
  addresses?: Maybe<Array<Address>>;
  billingId?: Maybe<Scalars['Int']>;
  shippingId?: Maybe<Scalars['Int']>;
};

export type OutletAdminParams = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  filters?: Maybe<OutletFilters>;
  sort?: Maybe<Sort>;
  bdmUserId?: Maybe<Scalars['Int']>;
};

export type OutletDeliveryDay = {
  __typename?: 'OutletDeliveryDay';
  fullDate: Scalars['String'];
  day: Scalars['String'];
  price: Scalars['Int'];
  isAvailable: Scalars['Boolean'];
};

export type OutletFilters = {
  statusId?: Maybe<Scalars['Int']>;
  style?: Maybe<Scalars['String']>;
};

export type OutletsResponse = {
  __typename?: 'OutletsResponse';
  totalCount: Scalars['Int'];
  outlets?: Maybe<Array<DslOutlet>>;
};

export type OutletUser = {
  __typename?: 'OutletUser';
  role: Scalars['String'];
  user: DslUser;
};

export type Pagination = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
};

export type Price = {
  __typename?: 'Price';
  subtotal: Scalars['Float'];
  vat: Scalars['Float'];
  discount: Scalars['Float'];
  total: Scalars['Float'];
};

export type PriceFilter = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type ProductAssociation = {
  __typename?: 'ProductAssociation';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProductAssociationInput = {
  productId: Scalars['Int'];
  vendorId?: Maybe<Scalars['Int']>;
  distributorId?: Maybe<Scalars['Int']>;
};

export type ProductAssociations = {
  __typename?: 'ProductAssociations';
  vendor?: Maybe<ProductAssociation>;
  distributor?: Maybe<ProductAssociation>;
};

export type ProductFeatureInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  featured: Scalars['Boolean'];
  filterable: Scalars['Boolean'];
  position: Scalars['Int'];
};

export type ProductFeaturesListInput = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  sort?: Maybe<Sort>;
};

export type ProductFeaturesListOutput = {
  __typename?: 'ProductFeaturesListOutput';
  totalCount: Scalars['Int'];
  features?: Maybe<Array<Maybe<DslProductFeature>>>;
};

export type ProductFilter = {
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type ProductPriceOverride = {
  __typename?: 'ProductPriceOverride';
  productId: Scalars['ID'];
  entityId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  value: Scalars['Float'];
  position: Scalars['Int'];
  isTax?: Maybe<Scalars['Boolean']>;
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  status: Status;
};

export type ProductPriceOverrideInput = {
  type: Scalars['String'];
  value: Scalars['Float'];
  position: Scalars['Int'];
  isTax?: Maybe<Scalars['Boolean']>;
  dateFrom?: Maybe<Scalars['String']>;
  dateTo?: Maybe<Scalars['String']>;
};

export type ProductPricing = {
  productId: Scalars['ID'];
  pricing?: Maybe<Array<InsertProductPrice>>;
};

export type ProductPricingInput = {
  productPrices?: Maybe<Array<Maybe<ProductPricing>>>;
};

export type ProductVariation = {
  __typename?: 'ProductVariation';
  product_id: Scalars['ID'];
  features?: Maybe<Array<ProductVariationFeature>>;
};

export type ProductVariationFeature = {
  __typename?: 'ProductVariationFeature';
  feature_id: Scalars['ID'];
  value: Scalars['String'];
};

export type Promotion = {
  __typename?: 'Promotion';
  id: Scalars['Int'];
  type: PromotionType;
  name: Scalars['String'];
  slug: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  imagePath: Scalars['String'];
  priority: Scalars['Int'];
  status: Scalars['String'];
  identityCode: Scalars['String'];
  terms: Scalars['String'];
  activeFrom: Scalars['String'];
  activeTo?: Maybe<Scalars['String']>;
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
  productsInPromotion?: Maybe<Array<Scalars['Int']>>;
  categoriesInPromotion?: Maybe<Array<Scalars['Int']>>;
};

export type PromotionResult = {
  __typename?: 'PromotionResult';
  promotionId: Scalars['Int'];
  promotionName: Scalars['String'];
  name: Scalars['String'];
  effectType: Scalars['String'];
  changes?: Maybe<Array<PromotionResultChange>>;
};

export type PromotionResultChange = {
  __typename?: 'PromotionResultChange';
  id: Scalars['Int'];
  entityId: Scalars['Int'];
  entityType: Scalars['String'];
  originalValue: Scalars['Float'];
  valueChange: Scalars['Float'];
  newValue: Scalars['Float'];
};

export type PromotionType = {
  __typename?: 'PromotionType';
  name: Scalars['String'];
  displayName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns a list of categories and sub categories if requested. */
  dslCategories?: Maybe<Array<DslCategory>>;
  /** Returns a category matching the supplied id or `null` if none is found. */
  dslCategoryById?: Maybe<DslCategory>;
  /** Returns a category matching the supplied path or `null` if none is found. */
  dslCategoryByPath?: Maybe<DslCategory>;
  /** Returns a list of products for the supplied category `id`. */
  dslCategoryProducts: DslProductsResponse;
  /** Returns a list of products for the supplied brand `slug`. */
  dslBrandPartnerProducts: DslProductsResponse;
  /** Returns a list of products which match the supplied search string. */
  dslProductSearch: DslProductsResponse;
  /** Returns a single product matching the supplied id or `null` if none is found. */
  dslProductById?: Maybe<DslProduct>;
  /** Returns a single product matching the supplied path or `null` if none is found. */
  dslProductByPath?: Maybe<DslProduct>;
  /**
   * Returns the price of a product given the product ID
   * This method will also apply the current context, and return the most relevant price for the context
   */
  dslProductPrice: Price;
  /**
   * Returns a list of related products for the supplied product slug and will fallback to category products if there are
   * not enough specified.
   */
  dslRelatedProducts?: Maybe<Array<DslProduct>>;
  /**
   * Returns a list of cross sell products as per the specified type. Type can be something like `homepage`, `cart`,
   * `forgotten`, etc.
   */
  dslCrossSellProducts?: Maybe<Array<DslProduct>>;
  /** Returns any recently ordered products. */
  dslRecentlyOrderedProducts: DslProductsResponse;
  /** Returns the cart for the current user or guest as per any attached `access_token`. */
  dslCart?: Maybe<DslCart>;
  /** Returns the current user if one is found in the session. */
  dslCurrentUser?: Maybe<AuthDslResponse>;
  /** Returns a list of orders for the currently logged in user. */
  dslUserOrders: DslOrderResponse;
  /** Returns an order for the supplied id if it exists. */
  dslOrderById?: Maybe<DslOrder>;
  /**
   * This is a test query which will imitate the CS Cart backend view orders page
   * This will be restricted to users with an entity relationship of [UserType:Admin]
   */
  dslOrders?: Maybe<Array<DslOrder>>;
  /** This will return the credit information for Admiral outlet based on the current context */
  creditEnquiry: CreditEnquiryResponse;
  /** Will fetch CMS managed content depending on the supplied params. */
  content?: Maybe<Array<Maybe<Content>>>;
  /** Will return a list of the user's wishlists. */
  wishlists?: Maybe<Array<Wishlist>>;
  /** Will return the detail of a user's wishlist. */
  wishlistDetail?: Maybe<Wishlist>;
  /** Returns a list of available promotions. */
  promotions?: Maybe<Array<Promotion>>;
  /** Returns a list of available promotion types that can be used for filtering. */
  promotionTypes?: Maybe<Array<PromotionType>>;
  /**
   * Returns a list of promotions mataching the supplied `type`. This should be the `name` field of the `PromotionType`
   * object.
   */
  getPromotionsByType?: Maybe<Array<Maybe<Promotion>>>;
  getAdminProducts: DslAdminProductsResponse;
  getAdminOutlets: OutletsResponse;
  getAdminCategories?: Maybe<Array<Maybe<DslCategory>>>;
  getEntityByName: Entity;
  getEntityTypeByName: EntityType;
  getTaxCodeById: TaxCode;
  getTaxCodeByCode: TaxCode;
  getTaxCodes?: Maybe<Array<TaxCode>>;
  getAdminTaxCodes?: Maybe<TaxCodesResponse>;
  getAdminUsers: AdminUsersResponse;
  getAdminSupportDocuments: SupportDocumentsResponse;
  getStarStockCompanyDetails: StarStockCompanyDetails;
  getAdminLogisticsFees?: Maybe<LogisticsFeesResponse>;
  getAdminOutletByID?: Maybe<DslOutlet>;
  getAdminLinkedProducts: LinkedProductsResponse;
  getSimilarProducts: GetSimilarProductsResponse;
  getYouMightAlsoLikeProducts: GetYouMightAlsoLikeProductsResponse;
  getAdminAbandonedCarts?: Maybe<AdminAbandonedCartsResponse>;
  getProductFeaturesList?: Maybe<ProductFeaturesListOutput>;
  getAdminDistributors?: Maybe<Array<DslBrand>>;
  /**
   * ETL Specific categories query
   * This returns all categories so the they can be mapped in the ETL via their `code`
   * This is required as there is no category setup information available from Nav
   */
  getETLCategories?: Maybe<Array<DslCategory>>;
  /**
   * ETL Specific tax codes query
   * This returns all tax codes so they can be mapped in the ETL via their `id`
   * This is required as there is no tax code setup information available from Nav
   */
  getETLTaxCodes?: Maybe<Array<TaxCode>>;
  /** Returns order data given the order ID */
  getETLOrder: GetEtlOrderResponse;
};

export type QueryDslCategoryByIdArgs = {
  id: Scalars['ID'];
};

export type QueryDslCategoryByPathArgs = {
  path: Scalars['String'];
};

export type QueryDslCategoryProductsArgs = {
  id: Scalars['ID'];
  sort?: Maybe<Sort>;
  pagination?: Maybe<Pagination>;
  filters?: Maybe<Array<ProductFilter>>;
};

export type QueryDslBrandPartnerProductsArgs = {
  slug: Scalars['String'];
  sort?: Maybe<Sort>;
  pagination?: Maybe<Pagination>;
  filters?: Maybe<Array<ProductFilter>>;
};

export type QueryDslProductSearchArgs = {
  searchQuery: Scalars['String'];
  sort?: Maybe<Sort>;
  pagination?: Maybe<Pagination>;
  filters?: Maybe<Array<ProductFilter>>;
};

export type QueryDslProductByIdArgs = {
  id: Scalars['ID'];
};

export type QueryDslProductByPathArgs = {
  path: Scalars['String'];
};

export type QueryDslProductPriceArgs = {
  productId: Scalars['Int'];
};

export type QueryDslRelatedProductsArgs = {
  slug: Scalars['String'];
  categoryId: Scalars['Int'];
  limit?: Scalars['Int'];
};

export type QueryDslCrossSellProductsArgs = {
  type: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
};

export type QueryDslRecentlyOrderedProductsArgs = {
  pagination?: Maybe<Pagination>;
};

export type QueryDslUserOrdersArgs = {
  sort?: Maybe<Sort>;
  filters?: Maybe<OrderFilters>;
  pagination?: Maybe<Pagination>;
};

export type QueryDslOrderByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContentArgs = {
  params?: Maybe<ContentFilterParams>;
  pagination?: Maybe<Pagination>;
};

export type QueryWishlistDetailArgs = {
  id: Scalars['String'];
};

export type QueryGetPromotionsByTypeArgs = {
  type: Scalars['String'];
};

export type QueryGetAdminProductsArgs = {
  params?: Maybe<DslProductAdminParams>;
};

export type QueryGetAdminOutletsArgs = {
  params?: Maybe<OutletAdminParams>;
};

export type QueryGetEntityByNameArgs = {
  name: Scalars['String'];
  typeId: Scalars['Int'];
};

export type QueryGetEntityTypeByNameArgs = {
  name: Scalars['String'];
};

export type QueryGetTaxCodeByIdArgs = {
  id: Scalars['Int'];
};

export type QueryGetTaxCodeByCodeArgs = {
  code: Scalars['String'];
};

export type QueryGetAdminTaxCodesArgs = {
  params?: Maybe<TaxCodesAdminParams>;
};

export type QueryGetAdminUsersArgs = {
  params: AdminUsersParams;
};

export type QueryGetAdminSupportDocumentsArgs = {
  params?: Maybe<SupportDocumentAdminParams>;
};

export type QueryGetAdminLogisticsFeesArgs = {
  params?: Maybe<LogisticsFeesParams>;
};

export type QueryGetAdminOutletByIdArgs = {
  outletId: Scalars['Int'];
};

export type QueryGetAdminLinkedProductsArgs = {
  productId: Scalars['Int'];
};

export type QueryGetSimilarProductsArgs = {
  productId: Scalars['Int'];
};

export type QueryGetYouMightAlsoLikeProductsArgs = {
  productId: Scalars['Int'];
};

export type QueryGetAdminAbandonedCartsArgs = {
  params?: Maybe<AdminAbandonedCartsInput>;
};

export type QueryGetProductFeaturesListArgs = {
  params?: Maybe<ProductFeaturesListInput>;
};

export type QueryGetAdminDistributorsArgs = {
  params?: Maybe<BasicAdminListInput>;
};

export type QueryGetEtlOrderArgs = {
  input?: Maybe<GetEtlOrderInput>;
};

export type RegisterUser = {
  title: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type ResetPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

/**
 * Role is an enum containing the possible user roles. This can the be used to
 * define which GQL endpoints or fields are accessible to the different user types.
 * For now, this is hardcoded as part of the GQL schema but we can eventually move
 * this out into the DB for dynamic role -> permission setup.
 */
export enum Role {
  User = 'USER',
  Brandowner = 'BRANDOWNER',
  Telesales = 'TELESALES',
  Starstockadmin = 'STARSTOCKADMIN',
}

export type SetUserOutletInput = {
  outletId: Scalars['Int'];
};

export type SetUserOutletResponse = {
  __typename?: 'SetUserOutletResponse';
  success: Scalars['Boolean'];
  dslCart?: Maybe<DslCart>;
};

export type Sort = {
  by: Scalars['String'];
  direction: Scalars['String'];
};

export type StarStockCompanyDetails = {
  __typename?: 'StarStockCompanyDetails';
  companyName: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  county: Scalars['String'];
  postcode: Scalars['String'];
  vatNumber: Scalars['String'];
  awrs: Scalars['String'];
};

export type StarStockCompanyDetailsAdminParams = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  filters?: Maybe<Array<Maybe<DslAdminFilter>>>;
  sort?: Maybe<Sort>;
};

export type StarStockCompanyDetailsInput = {
  companyName: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  county: Scalars['String'];
  postcode: Scalars['String'];
  vatNumber: Scalars['String'];
  awrs: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['ID'];
  value: Scalars['Int'];
  displayName: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  createdOn: Scalars['String'];
  updatedOn: Scalars['String'];
};

export type SupportDocument = {
  __typename?: 'SupportDocument';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  status: Status;
};

export type SupportDocumentAdminParams = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  filters?: Maybe<SupportDocumentFilters>;
};

export type SupportDocumentData = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type SupportDocumentFilters = {
  statusId?: Maybe<Scalars['Int']>;
};

export type SupportDocumentsResponse = {
  __typename?: 'SupportDocumentsResponse';
  totalCount: Scalars['Int'];
  documents?: Maybe<Array<Maybe<SupportDocument>>>;
};

export type TaxCode = {
  __typename?: 'TaxCode';
  id: Scalars['Int'];
  name: Scalars['String'];
  code: Scalars['String'];
  priority: Scalars['Int'];
  status: Status;
  calculationType: Scalars['String'];
  inclusive: Scalars['Boolean'];
  rate: Scalars['Float'];
};

export type TaxCodeData = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  code: Scalars['String'];
  priority: Scalars['Int'];
  calculationType: Scalars['String'];
  inclusive: Scalars['Boolean'];
  rate: Scalars['Float'];
};

export type TaxCodeFilter = {
  field: Scalars['String'];
  value: Scalars['String'];
};

export type TaxCodeInput = {
  data: TaxCodeData;
  status: Scalars['Int'];
};

export type TaxCodesAdminParams = {
  search?: Maybe<Scalars['String']>;
  pagination?: Maybe<DslAdminPagination>;
  filters?: Maybe<Array<Maybe<DslAdminFilter>>>;
  sort?: Maybe<Sort>;
};

export type TaxCodesFilter = {
  field: Scalars['String'];
  order: Scalars['String'];
};

export type TaxCodesResponse = {
  __typename?: 'TaxCodesResponse';
  totalCount: Scalars['Int'];
  taxCodes?: Maybe<Array<Maybe<TaxCode>>>;
};

export type TaxCountry = {
  __typename?: 'TaxCountry';
  id: Scalars['Int'];
  code: Scalars['String'];
  name: Scalars['String'];
};

export type TaxRate = {
  __typename?: 'TaxRate';
  value: Scalars['Float'];
  calculationType: Scalars['String'];
};

export type UpdateAddress = {
  id: Scalars['Int'];
  title: Scalars['String'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo: Scalars['String'];
  lineThree: Scalars['String'];
  city: Scalars['String'];
  county: Scalars['String'];
  postcode: Scalars['String'];
  country: Scalars['String'];
};

export type UpdateAddressInput = {
  address: UpdateAddress;
};

export type UpdateAdminOutletInput = {
  id: Scalars['Int'];
  outlet?: Maybe<InsertOutlet>;
  status_id?: Maybe<Scalars['Int']>;
  shippingAddress?: Maybe<InsertAddress>;
  billingAddress?: Maybe<InsertAddress>;
  typeName?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Scalars['String']>>;
};

export type UpdateAdminUserPasswordInput = {
  userId: Scalars['Int'];
  newPassword: Scalars['String'];
};

export type UpdateEtlOrderStatusInput = {
  orderId: Scalars['Int'];
  status: Scalars['String'];
};

export type UpdateLogisticFeeResponse = {
  __typename?: 'UpdateLogisticFeeResponse';
  fee: LogisticsFee;
};

export type UpdateLogisticsFeeInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  statusId: Scalars['Int'];
  logisticsTypeId: Scalars['Int'];
  fee: Scalars['Float'];
};

export type UpdateOutletBillingInput = {
  address: InsertAddress;
};

export type UpdateOutletBillingResponse = {
  __typename?: 'updateOutletBillingResponse';
  address?: Maybe<Address>;
};

export type UpdateOutletInput = {
  id: Scalars['Int'];
  outletName: Scalars['String'];
  dropPointDescription: Scalars['String'];
};

export type UpdateOutletResponse = {
  __typename?: 'UpdateOutletResponse';
  outlet: DslOutlet;
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type UpdateProductFeatureInput = {
  id: Scalars['ID'];
  data?: Maybe<ProductFeatureInput>;
};

export type UpdateProductInput = {
  id: Scalars['ID'];
  product: InsertProduct;
  categoryId?: Maybe<Scalars['Int']>;
  taxCodeId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  vendorId?: Maybe<Scalars['Int']>;
  distributorId?: Maybe<Scalars['Int']>;
};

export type UpdateProductResponse = {
  __typename?: 'UpdateProductResponse';
  product: DslProduct;
};

export type UpdateProductVariationsInput = {
  productId: Scalars['Int'];
};

export type UpdateProductVariationsResponse = {
  __typename?: 'UpdateProductVariationsResponse';
  temp: Scalars['String'];
};

export type UpdateSimilarProductsInput = {
  productID: Scalars['Int'];
  relatedProductsIDs?: Maybe<Array<Scalars['Int']>>;
};

export type UpdateSimilarProductsResponse = {
  __typename?: 'UpdateSimilarProductsResponse';
  products?: Maybe<Array<DslProduct>>;
};

export type UpdateStarStockCompanyDetailsInput = {
  data: StarStockCompanyDetailsInput;
};

export type UpdateSupportDocumentInput = {
  id: Scalars['Int'];
  statusId: Scalars['Int'];
  data: SupportDocumentData;
};

export type UpdateUser = {
  title: Scalars['String'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  confirmEmail: Scalars['String'];
  marketing: Scalars['Boolean'];
};

export type UpdateUserInput = {
  user: DslUserInput;
  outletId?: Maybe<Scalars['Int']>;
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  user?: Maybe<DslUser>;
  notification?: Maybe<Scalars['String']>;
};

export type UpdateYouMightAlsoLikeProductsInput = {
  productID: Scalars['Int'];
  relatedProductsIDs?: Maybe<Array<Scalars['Int']>>;
};

export type UpdateYouMightAlsoLikeProductsResponse = {
  __typename?: 'UpdateYouMightAlsoLikeProductsResponse';
  products?: Maybe<Array<DslProduct>>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  Name: Scalars['String'];
};

export type UserIdentity = {
  __typename?: 'UserIdentity';
  id: Scalars['Int'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type UserInsert = {
  title: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  marketing: Scalars['Boolean'];
};

export type UserManagement = {
  __typename?: 'UserManagement';
  relationships?: Maybe<Array<Maybe<UserRelationship>>>;
};

export type UserRegistrationInput = {
  user: RegisterUser;
  marketingCommunication: Scalars['Boolean'];
};

export type UserRelationship = {
  __typename?: 'UserRelationship';
  name: Scalars['String'];
  entities?: Maybe<Array<Maybe<UserEntity>>>;
};

export type UsersFilter = {
  statusId?: Maybe<Scalars['Int']>;
};

export type UserUpdateInput = {
  user: UpdateUser;
};

export type Wishlist = {
  __typename?: 'Wishlist';
  id: Scalars['ID'];
  userId: Scalars['Int'];
  name: Scalars['String'];
  canDelete: Scalars['Boolean'];
  active: Scalars['Boolean'];
  created: Scalars['String'];
  items?: Maybe<Array<Scalars['Int']>>;
};

export type WishlistItem = {
  __typename?: 'WishlistItem';
  id: Scalars['ID'];
  productId: Scalars['Int'];
  position: Scalars['Int'];
  created: Scalars['String'];
  lastUpdated: Scalars['String'];
};

export type AddressFieldsFragment = { __typename?: 'Address' } & Pick<
  Address,
  | 'id'
  | 'title'
  | 'firstName'
  | 'lastName'
  | 'lineOne'
  | 'lineTwo'
  | 'lineThree'
  | 'city'
  | 'county'
  | 'postcode'
  | 'country'
>;

export type DslProductFieldsFragment = { __typename?: 'DslProduct' } & Pick<
  DslProduct,
  | 'id'
  | 'type'
  | 'name'
  | 'shortDescription'
  | 'longDescription'
  | 'code'
  | 'mrrp'
  | 'popularity'
  | 'searchWords'
  | 'seoTitle'
  | 'seoDescription'
  | 'seoKeywords'
  | 'seoSlug'
  | 'weight'
  | 'boxLength'
  | 'boxWidth'
  | 'boxHeight'
  | 'featured'
  | 'createdOn'
  | 'updatedOn'
  | 'onWishlist'
> & {
    status: { __typename?: 'Status' } & Pick<
      Status,
      'id' | 'value' | 'displayName' | 'description' | 'createdOn' | 'updatedOn'
    >;
    features?: Maybe<
      Array<
        { __typename?: 'DslProductFeature' } & Pick<
          DslProductFeature,
          | 'id'
          | 'name'
          | 'value'
          | 'description'
          | 'featured'
          | 'filterable'
          | 'position'
          | 'createdOn'
          | 'updatedOn'
        >
      >
    >;
    options?: Maybe<
      Array<
        { __typename?: 'DslProductOption' } & Pick<
          DslProductOption,
          'id' | 'productId' | 'name' | 'description' | 'icon' | 'createdOn' | 'updatedOn'
        >
      >
    >;
    price: { __typename?: 'Price' } & Pick<Price, 'subtotal' | 'vat' | 'total'>;
    mainImage?: Maybe<
      { __typename?: 'DslProductImage' } & Pick<
        DslProductImage,
        'id' | 'productId' | 'type' | 'fullSizePath' | 'thumbnailPath' | 'createdOn' | 'updatedOn'
      >
    >;
    additionalImages?: Maybe<
      Array<
        { __typename?: 'DslProductImage' } & Pick<
          DslProductImage,
          'id' | 'productId' | 'type' | 'fullSizePath' | 'thumbnailPath' | 'createdOn' | 'updatedOn'
        >
      >
    >;
  };

export type CreateDocumentMutationVariables = Exact<{
  input?: Maybe<InsertSupportDocumentInput>;
}>;

export type CreateDocumentMutation = { __typename?: 'Mutation' } & {
  insertAdminSupportDocument: { __typename?: 'SupportDocument' } & Pick<SupportDocument, 'id'>;
};

export type CreateLogisticsFeeMutationVariables = Exact<{
  input: InsertLogisticsFeeInput;
}>;

export type CreateLogisticsFeeMutation = { __typename?: 'Mutation' } & {
  insertAdminLogisticsFee: { __typename?: 'InsertLogisticFeeResponse' } & {
    fee: { __typename?: 'LogisticsFee' } & Pick<LogisticsFee, 'id'>;
  };
};

export type CreateOutletMutationVariables = Exact<{
  input: InsertOutletInput;
}>;

export type CreateOutletMutation = { __typename?: 'Mutation' } & {
  insertAdminOutlet: { __typename?: 'InsertOutletResponse' } & {
    outlet: { __typename?: 'DslOutlet' } & Pick<DslOutlet, 'id' | 'name'>;
  };
};

export type CreateProductMutationVariables = Exact<{
  input: InsertProductInput;
}>;

export type CreateProductMutation = { __typename?: 'Mutation' } & {
  insertProduct: { __typename?: 'InsertProductResponse' } & {
    product: { __typename?: 'DslProduct' } & Pick<DslProduct, 'id'>;
  };
};

export type CreateTaxCodeMutationVariables = Exact<{
  input: TaxCodeInput;
}>;

export type CreateTaxCodeMutation = { __typename?: 'Mutation' } & {
  insertTaxCode: { __typename?: 'TaxCode' } & Pick<TaxCode, 'id'>;
};

export type DeleteTaxCodeByIdMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteTaxCodeByIdMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteTaxCodeById'
>;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  dslLogin: { __typename?: 'AuthDslResponse' } & Pick<AuthDslResponse, 'result'> & {
      user?: Maybe<
        { __typename?: 'DslUser' } & Pick<
          DslUser,
          'id' | 'title' | 'firstName' | 'lastName' | 'phone' | 'email'
        >
      >;
    };
};

export type UpdateCompanyDetailsMutationVariables = Exact<{
  input?: Maybe<UpdateStarStockCompanyDetailsInput>;
}>;

export type UpdateCompanyDetailsMutation = { __typename?: 'Mutation' } & {
  updateStarStockCompanyDetails: { __typename?: 'StarStockCompanyDetails' } & Pick<
    StarStockCompanyDetails,
    'companyName'
  >;
};

export type UpdateOutletMutationVariables = Exact<{
  input: UpdateAdminOutletInput;
}>;

export type UpdateOutletMutation = { __typename?: 'Mutation' } & {
  updateAdminOutlet: { __typename?: 'UpdateOutletResponse' } & {
    outlet: { __typename?: 'DslOutlet' } & Pick<DslOutlet, 'id'> & {
        status: { __typename?: 'Status' } & Pick<Status, 'id' | 'displayName'>;
      };
  };
};

export type UpdateTaxCodeMutationVariables = Exact<{
  input: TaxCodeInput;
}>;

export type UpdateTaxCodeMutation = { __typename?: 'Mutation' } & {
  updateTaxCode: { __typename?: 'TaxCode' } & Pick<TaxCode, 'id'>;
};

export type GetAbandonedCartsQueryVariables = Exact<{
  params?: Maybe<AdminAbandonedCartsInput>;
}>;

export type GetAbandonedCartsQuery = { __typename?: 'Query' } & {
  getAdminAbandonedCarts?: Maybe<
    { __typename?: 'AdminAbandonedCartsResponse' } & Pick<
      AdminAbandonedCartsResponse,
      'totalCount'
    > & {
        carts?: Maybe<
          Array<
            { __typename?: 'DslCart' } & Pick<
              DslCart,
              'id' | 'userId' | 'OutletId' | 'guestId' | 'totalProducts' | 'createdOn' | 'updatedOn'
            > & {
                products?: Maybe<
                  Array<
                    { __typename?: 'DslCartProduct' } & Pick<
                      DslCartProduct,
                      'id' | 'cartId' | 'productId' | 'qty' | 'lastKnownPrice'
                    >
                  >
                >;
                user?: Maybe<
                  { __typename?: 'DslUser' } & Pick<
                    DslUser,
                    | 'id'
                    | 'title'
                    | 'firstName'
                    | 'middleName'
                    | 'lastName'
                    | 'phone'
                    | 'email'
                    | 'marketing'
                  > & {
                      identities?: Maybe<
                        Array<
                          Maybe<
                            { __typename?: 'UserIdentity' } & Pick<
                              UserIdentity,
                              'id' | 'type' | 'value'
                            >
                          >
                        >
                      >;
                    }
                >;
                outlet?: Maybe<
                  { __typename?: 'DslOutlet' } & Pick<
                    DslOutlet,
                    | 'id'
                    | 'name'
                    | 'style'
                    | 'legalStatus'
                    | 'companyName'
                    | 'charityNumber'
                    | 'dropPointDescription'
                    | 'createdOn'
                    | 'updatedOn'
                    | 'lastOrdered'
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = { __typename?: 'Query' } & {
  dslCategories?: Maybe<
    Array<
      { __typename?: 'DslCategory' } & Pick<
        DslCategory,
        | 'id'
        | 'parentId'
        | 'name'
        | 'shortDescription'
        | 'longDescription'
        | 'seoTitle'
        | 'seoDescription'
        | 'seoKeywords'
        | 'seoSlug'
        | 'createdOn'
        | 'updatedOn'
      > & {
          status: { __typename?: 'Status' } & Pick<
            Status,
            'id' | 'value' | 'displayName' | 'description'
          >;
          subCategories?: Maybe<
            Array<
              Maybe<
                { __typename?: 'DslCategory' } & Pick<
                  DslCategory,
                  | 'id'
                  | 'parentId'
                  | 'name'
                  | 'shortDescription'
                  | 'longDescription'
                  | 'seoTitle'
                  | 'seoDescription'
                  | 'seoKeywords'
                  | 'seoSlug'
                  | 'createdOn'
                  | 'updatedOn'
                > & {
                    status: { __typename?: 'Status' } & Pick<
                      Status,
                      'id' | 'value' | 'displayName' | 'description'
                    >;
                    subCategories?: Maybe<
                      Array<
                        Maybe<
                          { __typename?: 'DslCategory' } & Pick<
                            DslCategory,
                            | 'id'
                            | 'parentId'
                            | 'name'
                            | 'shortDescription'
                            | 'longDescription'
                            | 'seoTitle'
                            | 'seoDescription'
                            | 'seoKeywords'
                            | 'seoSlug'
                            | 'createdOn'
                            | 'updatedOn'
                          > & {
                              status: { __typename?: 'Status' } & Pick<
                                Status,
                                'id' | 'value' | 'displayName' | 'description'
                              >;
                            }
                        >
                      >
                    >;
                  }
              >
            >
          >;
        }
    >
  >;
};

export type GetCompanyDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCompanyDetailsQuery = { __typename?: 'Query' } & {
  getStarStockCompanyDetails: { __typename?: 'StarStockCompanyDetails' } & Pick<
    StarStockCompanyDetails,
    'companyName' | 'address1' | 'address2' | 'city' | 'county' | 'postcode' | 'vatNumber' | 'awrs'
  >;
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = { __typename?: 'Query' } & {
  dslCurrentUser?: Maybe<
    { __typename?: 'AuthDslResponse' } & Pick<AuthDslResponse, 'result'> & {
        user?: Maybe<{ __typename?: 'DslUser' } & Pick<DslUser, 'firstName' | 'lastName'>>;
      }
  >;
};

export type GetDocumentsQueryVariables = Exact<{
  params?: Maybe<SupportDocumentAdminParams>;
}>;

export type GetDocumentsQuery = { __typename?: 'Query' } & {
  getAdminSupportDocuments: { __typename?: 'SupportDocumentsResponse' } & Pick<
    SupportDocumentsResponse,
    'totalCount'
  > & {
      documents?: Maybe<
        Array<
          Maybe<
            { __typename?: 'SupportDocument' } & Pick<SupportDocument, 'id' | 'name' | 'url'> & {
                status: { __typename?: 'Status' } & Pick<Status, 'id' | 'value' | 'displayName'>;
              }
          >
        >
      >;
    };
};

export type GetLogisticsFeesQueryVariables = Exact<{
  params?: Maybe<LogisticsFeesParams>;
}>;

export type GetLogisticsFeesQuery = { __typename?: 'Query' } & {
  getAdminLogisticsFees?: Maybe<
    { __typename?: 'LogisticsFeesResponse' } & Pick<LogisticsFeesResponse, 'totalCount'> & {
        fees: Array<
          { __typename?: 'LogisticsFee' } & Pick<
            LogisticsFee,
            'id' | 'name' | 'logisticsType' | 'fee'
          > & { status: { __typename?: 'Status' } & Pick<Status, 'id' | 'value' | 'displayName'> }
        >;
      }
  >;
};

export type GetOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetOrdersQuery = { __typename?: 'Query' } & {
  dslOrders?: Maybe<
    Array<
      { __typename?: 'DslOrder' } & Pick<
        DslOrder,
        | 'id'
        | 'userId'
        | 'subtotal'
        | 'discount'
        | 'total'
        | 'notes'
        | 'firstname'
        | 'lastname'
        | 'company'
        | 'billingLine1'
        | 'billingLine2'
        | 'billingLine3'
        | 'billingCity'
        | 'billingCounty'
        | 'billingPostcode'
        | 'billingCountry'
        | 'shippingLine1'
        | 'shippingLine2'
        | 'shippingLine3'
        | 'shippingCity'
        | 'shippingCounty'
        | 'shippingPostcode'
        | 'shippingCountry'
        | 'createdOn'
        | 'updatedOn'
      > & {
          status: { __typename?: 'Status' } & Pick<
            Status,
            'id' | 'value' | 'displayName' | 'description'
          >;
        }
    >
  >;
};

export type GetOutletByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type GetOutletByIdQuery = { __typename?: 'Query' } & {
  getAdminOutletByID?: Maybe<
    { __typename?: 'DslOutlet' } & Pick<
      DslOutlet,
      | 'id'
      | 'name'
      | 'style'
      | 'legalStatus'
      | 'companyName'
      | 'charityNumber'
      | 'dropPointDescription'
      | 'createdOn'
    > & {
        status: { __typename?: 'Status' } & Pick<Status, 'value' | 'displayName' | 'id'>;
        addressBook: { __typename?: 'OutletAddressBook' } & Pick<
          OutletAddressBook,
          'billingId' | 'shippingId'
        > & { addresses?: Maybe<Array<{ __typename?: 'Address' } & AddressFieldsFragment>> };
      }
  >;
};

export type GetOutletsQueryVariables = Exact<{
  params?: Maybe<OutletAdminParams>;
}>;

export type GetOutletsQuery = { __typename?: 'Query' } & {
  getAdminOutlets: { __typename?: 'OutletsResponse' } & Pick<OutletsResponse, 'totalCount'> & {
      outlets?: Maybe<
        Array<
          { __typename?: 'DslOutlet' } & Pick<DslOutlet, 'id' | 'name' | 'style' | 'createdOn'> & {
              status: { __typename?: 'Status' } & Pick<Status, 'displayName'>;
              addressBook: { __typename?: 'OutletAddressBook' } & Pick<
                OutletAddressBook,
                'shippingId'
              >;
            }
        >
      >;
    };
};

export type ProductByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ProductByIdQuery = { __typename?: 'Query' } & {
  dslProductById?: Maybe<{ __typename?: 'DslProduct' } & DslProductFieldsFragment>;
};

export type GetProductsQueryVariables = Exact<{
  params?: Maybe<DslProductAdminParams>;
}>;

export type GetProductsQuery = { __typename?: 'Query' } & {
  getAdminProducts: { __typename?: 'DslAdminProductsResponse' } & Pick<
    DslAdminProductsResponse,
    'totalCount'
  > & {
      products?: Maybe<
        Array<
          { __typename?: 'DslProduct' } & Pick<
            DslProduct,
            'id' | 'type' | 'name' | 'shortDescription' | 'longDescription' | 'code'
          > & {
              status: { __typename?: 'Status' } & Pick<
                Status,
                'id' | 'value' | 'displayName' | 'description'
              >;
              price: { __typename?: 'Price' } & Pick<Price, 'subtotal' | 'vat' | 'total'>;
              mainImage?: Maybe<
                { __typename?: 'DslProductImage' } & Pick<
                  DslProductImage,
                  | 'id'
                  | 'productId'
                  | 'type'
                  | 'fullSizePath'
                  | 'thumbnailPath'
                  | 'createdOn'
                  | 'updatedOn'
                >
              >;
            }
        >
      >;
    };
};

export type GetTaxCodeByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type GetTaxCodeByIdQuery = { __typename?: 'Query' } & {
  getTaxCodeById: { __typename?: 'TaxCode' } & Pick<
    TaxCode,
    'id' | 'name' | 'code' | 'rate' | 'calculationType'
  > & { status: { __typename?: 'Status' } & Pick<Status, 'id' | 'value' | 'displayName'> };
};

export type GetTaxCodesQueryVariables = Exact<{
  params?: Maybe<TaxCodesAdminParams>;
}>;

export type GetTaxCodesQuery = { __typename?: 'Query' } & {
  getAdminTaxCodes?: Maybe<
    { __typename?: 'TaxCodesResponse' } & Pick<TaxCodesResponse, 'totalCount'> & {
        taxCodes?: Maybe<
          Array<
            Maybe<
              { __typename?: 'TaxCode' } & Pick<
                TaxCode,
                'id' | 'name' | 'calculationType' | 'rate'
              > & {
                  status: { __typename?: 'Status' } & Pick<Status, 'id' | 'value' | 'displayName'>;
                }
            >
          >
        >;
      }
  >;
};

export const AddressFieldsFragmentDoc = gql`
  fragment AddressFields on Address {
    id
    title
    firstName
    lastName
    lineOne
    lineTwo
    lineThree
    city
    county
    postcode
    country
  }
`;
export const DslProductFieldsFragmentDoc = gql`
  fragment DslProductFields on DslProduct {
    id
    status {
      id
      value
      displayName
      description
      createdOn
      updatedOn
    }
    type
    name
    shortDescription
    longDescription
    code
    mrrp
    popularity
    searchWords
    seoTitle
    seoDescription
    seoKeywords
    seoSlug
    weight
    boxLength
    boxWidth
    boxHeight
    featured
    createdOn
    updatedOn
    features {
      id
      name
      value
      description
      featured
      filterable
      position
      createdOn
      updatedOn
    }
    options {
      id
      productId
      name
      description
      icon
      createdOn
      updatedOn
    }
    price {
      subtotal
      vat
      total
    }
    mainImage {
      id
      productId
      type
      fullSizePath
      thumbnailPath
      createdOn
      updatedOn
    }
    additionalImages {
      id
      productId
      type
      fullSizePath
      thumbnailPath
      createdOn
      updatedOn
    }
    onWishlist
  }
`;
export const CreateDocumentDocument = gql`
  mutation createDocument($input: InsertSupportDocumentInput) {
    insertAdminSupportDocument(input: $input) {
      id
    }
  }
`;
export type CreateDocumentMutationFn = ApolloReactCommon.MutationFunction<
  CreateDocumentMutation,
  CreateDocumentMutationVariables
>;
export type CreateDocumentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateDocumentMutation,
    CreateDocumentMutationVariables
  >,
  'mutation'
>;

export const CreateDocumentComponent = (props: CreateDocumentComponentProps) => (
  <ApolloReactComponents.Mutation<CreateDocumentMutation, CreateDocumentMutationVariables>
    mutation={CreateDocumentDocument}
    {...props}
  />
);

export type CreateDocumentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateDocumentMutation,
    CreateDocumentMutationVariables
  >;
} &
  TChildProps;
export function withCreateDocument<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateDocumentMutation,
    CreateDocumentMutationVariables,
    CreateDocumentProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateDocumentMutation,
    CreateDocumentMutationVariables,
    CreateDocumentProps<TChildProps, TDataName>
  >(CreateDocumentDocument, {
    alias: 'createDocument',
    ...operationOptions,
  });
}

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateDocumentMutation,
    CreateDocumentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(
    CreateDocumentDocument,
    baseOptions,
  );
}
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = ApolloReactCommon.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateDocumentMutation,
  CreateDocumentMutationVariables
>;
export const CreateLogisticsFeeDocument = gql`
  mutation CreateLogisticsFee($input: InsertLogisticsFeeInput!) {
    insertAdminLogisticsFee(input: $input) {
      fee {
        id
      }
    }
  }
`;
export type CreateLogisticsFeeMutationFn = ApolloReactCommon.MutationFunction<
  CreateLogisticsFeeMutation,
  CreateLogisticsFeeMutationVariables
>;
export type CreateLogisticsFeeComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateLogisticsFeeMutation,
    CreateLogisticsFeeMutationVariables
  >,
  'mutation'
>;

export const CreateLogisticsFeeComponent = (props: CreateLogisticsFeeComponentProps) => (
  <ApolloReactComponents.Mutation<CreateLogisticsFeeMutation, CreateLogisticsFeeMutationVariables>
    mutation={CreateLogisticsFeeDocument}
    {...props}
  />
);

export type CreateLogisticsFeeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateLogisticsFeeMutation,
    CreateLogisticsFeeMutationVariables
  >;
} &
  TChildProps;
export function withCreateLogisticsFee<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateLogisticsFeeMutation,
    CreateLogisticsFeeMutationVariables,
    CreateLogisticsFeeProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateLogisticsFeeMutation,
    CreateLogisticsFeeMutationVariables,
    CreateLogisticsFeeProps<TChildProps, TDataName>
  >(CreateLogisticsFeeDocument, {
    alias: 'createLogisticsFee',
    ...operationOptions,
  });
}

/**
 * __useCreateLogisticsFeeMutation__
 *
 * To run a mutation, you first call `useCreateLogisticsFeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLogisticsFeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLogisticsFeeMutation, { data, loading, error }] = useCreateLogisticsFeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLogisticsFeeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateLogisticsFeeMutation,
    CreateLogisticsFeeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateLogisticsFeeMutation,
    CreateLogisticsFeeMutationVariables
  >(CreateLogisticsFeeDocument, baseOptions);
}
export type CreateLogisticsFeeMutationHookResult = ReturnType<typeof useCreateLogisticsFeeMutation>;
export type CreateLogisticsFeeMutationResult = ApolloReactCommon.MutationResult<
  CreateLogisticsFeeMutation
>;
export type CreateLogisticsFeeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLogisticsFeeMutation,
  CreateLogisticsFeeMutationVariables
>;
export const CreateOutletDocument = gql`
  mutation CreateOutlet($input: InsertOutletInput!) {
    insertAdminOutlet(input: $input) {
      outlet {
        id
        name
      }
    }
  }
`;
export type CreateOutletMutationFn = ApolloReactCommon.MutationFunction<
  CreateOutletMutation,
  CreateOutletMutationVariables
>;
export type CreateOutletComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateOutletMutation,
    CreateOutletMutationVariables
  >,
  'mutation'
>;

export const CreateOutletComponent = (props: CreateOutletComponentProps) => (
  <ApolloReactComponents.Mutation<CreateOutletMutation, CreateOutletMutationVariables>
    mutation={CreateOutletDocument}
    {...props}
  />
);

export type CreateOutletProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateOutletMutation,
    CreateOutletMutationVariables
  >;
} &
  TChildProps;
export function withCreateOutlet<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateOutletMutation,
    CreateOutletMutationVariables,
    CreateOutletProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateOutletMutation,
    CreateOutletMutationVariables,
    CreateOutletProps<TChildProps, TDataName>
  >(CreateOutletDocument, {
    alias: 'createOutlet',
    ...operationOptions,
  });
}

/**
 * __useCreateOutletMutation__
 *
 * To run a mutation, you first call `useCreateOutletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOutletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOutletMutation, { data, loading, error }] = useCreateOutletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOutletMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateOutletMutation,
    CreateOutletMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateOutletMutation, CreateOutletMutationVariables>(
    CreateOutletDocument,
    baseOptions,
  );
}
export type CreateOutletMutationHookResult = ReturnType<typeof useCreateOutletMutation>;
export type CreateOutletMutationResult = ApolloReactCommon.MutationResult<CreateOutletMutation>;
export type CreateOutletMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOutletMutation,
  CreateOutletMutationVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($input: InsertProductInput!) {
    insertProduct(input: $input) {
      product {
        id
      }
    }
  }
`;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export type CreateProductComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
  'mutation'
>;

export const CreateProductComponent = (props: CreateProductComponentProps) => (
  <ApolloReactComponents.Mutation<CreateProductMutation, CreateProductMutationVariables>
    mutation={CreateProductDocument}
    {...props}
  />
);

export type CreateProductProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateProductMutation,
    CreateProductMutationVariables
  >;
} &
  TChildProps;
export function withCreateProduct<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateProductMutation,
    CreateProductMutationVariables,
    CreateProductProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateProductMutation,
    CreateProductMutationVariables,
    CreateProductProps<TChildProps, TDataName>
  >(CreateProductDocument, {
    alias: 'createProduct',
    ...operationOptions,
  });
}

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(
    CreateProductDocument,
    baseOptions,
  );
}
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const CreateTaxCodeDocument = gql`
  mutation CreateTaxCode($input: TaxCodeInput!) {
    insertTaxCode(input: $input) {
      id
    }
  }
`;
export type CreateTaxCodeMutationFn = ApolloReactCommon.MutationFunction<
  CreateTaxCodeMutation,
  CreateTaxCodeMutationVariables
>;
export type CreateTaxCodeComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateTaxCodeMutation,
    CreateTaxCodeMutationVariables
  >,
  'mutation'
>;

export const CreateTaxCodeComponent = (props: CreateTaxCodeComponentProps) => (
  <ApolloReactComponents.Mutation<CreateTaxCodeMutation, CreateTaxCodeMutationVariables>
    mutation={CreateTaxCodeDocument}
    {...props}
  />
);

export type CreateTaxCodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateTaxCodeMutation,
    CreateTaxCodeMutationVariables
  >;
} &
  TChildProps;
export function withCreateTaxCode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateTaxCodeMutation,
    CreateTaxCodeMutationVariables,
    CreateTaxCodeProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateTaxCodeMutation,
    CreateTaxCodeMutationVariables,
    CreateTaxCodeProps<TChildProps, TDataName>
  >(CreateTaxCodeDocument, {
    alias: 'createTaxCode',
    ...operationOptions,
  });
}

/**
 * __useCreateTaxCodeMutation__
 *
 * To run a mutation, you first call `useCreateTaxCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaxCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaxCodeMutation, { data, loading, error }] = useCreateTaxCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaxCodeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTaxCodeMutation,
    CreateTaxCodeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateTaxCodeMutation, CreateTaxCodeMutationVariables>(
    CreateTaxCodeDocument,
    baseOptions,
  );
}
export type CreateTaxCodeMutationHookResult = ReturnType<typeof useCreateTaxCodeMutation>;
export type CreateTaxCodeMutationResult = ApolloReactCommon.MutationResult<CreateTaxCodeMutation>;
export type CreateTaxCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTaxCodeMutation,
  CreateTaxCodeMutationVariables
>;
export const DeleteTaxCodeByIdDocument = gql`
  mutation DeleteTaxCodeById($id: Int!) {
    deleteTaxCodeById(id: $id)
  }
`;
export type DeleteTaxCodeByIdMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTaxCodeByIdMutation,
  DeleteTaxCodeByIdMutationVariables
>;
export type DeleteTaxCodeByIdComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteTaxCodeByIdMutation,
    DeleteTaxCodeByIdMutationVariables
  >,
  'mutation'
>;

export const DeleteTaxCodeByIdComponent = (props: DeleteTaxCodeByIdComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteTaxCodeByIdMutation, DeleteTaxCodeByIdMutationVariables>
    mutation={DeleteTaxCodeByIdDocument}
    {...props}
  />
);

export type DeleteTaxCodeByIdProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    DeleteTaxCodeByIdMutation,
    DeleteTaxCodeByIdMutationVariables
  >;
} &
  TChildProps;
export function withDeleteTaxCodeById<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteTaxCodeByIdMutation,
    DeleteTaxCodeByIdMutationVariables,
    DeleteTaxCodeByIdProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteTaxCodeByIdMutation,
    DeleteTaxCodeByIdMutationVariables,
    DeleteTaxCodeByIdProps<TChildProps, TDataName>
  >(DeleteTaxCodeByIdDocument, {
    alias: 'deleteTaxCodeById',
    ...operationOptions,
  });
}

/**
 * __useDeleteTaxCodeByIdMutation__
 *
 * To run a mutation, you first call `useDeleteTaxCodeByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaxCodeByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaxCodeByIdMutation, { data, loading, error }] = useDeleteTaxCodeByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaxCodeByIdMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteTaxCodeByIdMutation,
    DeleteTaxCodeByIdMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteTaxCodeByIdMutation,
    DeleteTaxCodeByIdMutationVariables
  >(DeleteTaxCodeByIdDocument, baseOptions);
}
export type DeleteTaxCodeByIdMutationHookResult = ReturnType<typeof useDeleteTaxCodeByIdMutation>;
export type DeleteTaxCodeByIdMutationResult = ApolloReactCommon.MutationResult<
  DeleteTaxCodeByIdMutation
>;
export type DeleteTaxCodeByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTaxCodeByIdMutation,
  DeleteTaxCodeByIdMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    dslLogin(authRequest: { username: $email, password: $password }) {
      result
      user {
        id
        title
        firstName
        lastName
        phone
        email
      }
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
} &
  TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps, TDataName>
  >(LoginDocument, {
    alias: 'login',
    ...operationOptions,
  });
}

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UpdateCompanyDetailsDocument = gql`
  mutation UpdateCompanyDetails($input: UpdateStarStockCompanyDetailsInput) {
    updateStarStockCompanyDetails(input: $input) {
      companyName
    }
  }
`;
export type UpdateCompanyDetailsMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyDetailsMutation,
  UpdateCompanyDetailsMutationVariables
>;
export type UpdateCompanyDetailsComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables
  >,
  'mutation'
>;

export const UpdateCompanyDetailsComponent = (props: UpdateCompanyDetailsComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables
  >
    mutation={UpdateCompanyDetailsDocument}
    {...props}
  />
);

export type UpdateCompanyDetailsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables
  >;
} &
  TChildProps;
export function withUpdateCompanyDetails<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables,
    UpdateCompanyDetailsProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables,
    UpdateCompanyDetailsProps<TChildProps, TDataName>
  >(UpdateCompanyDetailsDocument, {
    alias: 'updateCompanyDetails',
    ...operationOptions,
  });
}

/**
 * __useUpdateCompanyDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyDetailsMutation, { data, loading, error }] = useUpdateCompanyDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyDetailsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateCompanyDetailsMutation,
    UpdateCompanyDetailsMutationVariables
  >(UpdateCompanyDetailsDocument, baseOptions);
}
export type UpdateCompanyDetailsMutationHookResult = ReturnType<
  typeof useUpdateCompanyDetailsMutation
>;
export type UpdateCompanyDetailsMutationResult = ApolloReactCommon.MutationResult<
  UpdateCompanyDetailsMutation
>;
export type UpdateCompanyDetailsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyDetailsMutation,
  UpdateCompanyDetailsMutationVariables
>;
export const UpdateOutletDocument = gql`
  mutation UpdateOutlet($input: UpdateAdminOutletInput!) {
    updateAdminOutlet(input: $input) {
      outlet {
        id
        status {
          id
          displayName
        }
      }
    }
  }
`;
export type UpdateOutletMutationFn = ApolloReactCommon.MutationFunction<
  UpdateOutletMutation,
  UpdateOutletMutationVariables
>;
export type UpdateOutletComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateOutletMutation,
    UpdateOutletMutationVariables
  >,
  'mutation'
>;

export const UpdateOutletComponent = (props: UpdateOutletComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateOutletMutation, UpdateOutletMutationVariables>
    mutation={UpdateOutletDocument}
    {...props}
  />
);

export type UpdateOutletProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    UpdateOutletMutation,
    UpdateOutletMutationVariables
  >;
} &
  TChildProps;
export function withUpdateOutlet<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateOutletMutation,
    UpdateOutletMutationVariables,
    UpdateOutletProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateOutletMutation,
    UpdateOutletMutationVariables,
    UpdateOutletProps<TChildProps, TDataName>
  >(UpdateOutletDocument, {
    alias: 'updateOutlet',
    ...operationOptions,
  });
}

/**
 * __useUpdateOutletMutation__
 *
 * To run a mutation, you first call `useUpdateOutletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOutletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOutletMutation, { data, loading, error }] = useUpdateOutletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOutletMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateOutletMutation,
    UpdateOutletMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateOutletMutation, UpdateOutletMutationVariables>(
    UpdateOutletDocument,
    baseOptions,
  );
}
export type UpdateOutletMutationHookResult = ReturnType<typeof useUpdateOutletMutation>;
export type UpdateOutletMutationResult = ApolloReactCommon.MutationResult<UpdateOutletMutation>;
export type UpdateOutletMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOutletMutation,
  UpdateOutletMutationVariables
>;
export const UpdateTaxCodeDocument = gql`
  mutation UpdateTaxCode($input: TaxCodeInput!) {
    updateTaxCode(input: $input) {
      id
    }
  }
`;
export type UpdateTaxCodeMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTaxCodeMutation,
  UpdateTaxCodeMutationVariables
>;
export type UpdateTaxCodeComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateTaxCodeMutation,
    UpdateTaxCodeMutationVariables
  >,
  'mutation'
>;

export const UpdateTaxCodeComponent = (props: UpdateTaxCodeComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateTaxCodeMutation, UpdateTaxCodeMutationVariables>
    mutation={UpdateTaxCodeDocument}
    {...props}
  />
);

export type UpdateTaxCodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    UpdateTaxCodeMutation,
    UpdateTaxCodeMutationVariables
  >;
} &
  TChildProps;
export function withUpdateTaxCode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateTaxCodeMutation,
    UpdateTaxCodeMutationVariables,
    UpdateTaxCodeProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateTaxCodeMutation,
    UpdateTaxCodeMutationVariables,
    UpdateTaxCodeProps<TChildProps, TDataName>
  >(UpdateTaxCodeDocument, {
    alias: 'updateTaxCode',
    ...operationOptions,
  });
}

/**
 * __useUpdateTaxCodeMutation__
 *
 * To run a mutation, you first call `useUpdateTaxCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaxCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaxCodeMutation, { data, loading, error }] = useUpdateTaxCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaxCodeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTaxCodeMutation,
    UpdateTaxCodeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateTaxCodeMutation, UpdateTaxCodeMutationVariables>(
    UpdateTaxCodeDocument,
    baseOptions,
  );
}
export type UpdateTaxCodeMutationHookResult = ReturnType<typeof useUpdateTaxCodeMutation>;
export type UpdateTaxCodeMutationResult = ApolloReactCommon.MutationResult<UpdateTaxCodeMutation>;
export type UpdateTaxCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTaxCodeMutation,
  UpdateTaxCodeMutationVariables
>;
export const GetAbandonedCartsDocument = gql`
  query GetAbandonedCarts($params: AdminAbandonedCartsInput) {
    getAdminAbandonedCarts(params: $params) {
      totalCount
      carts {
        id
        userId
        OutletId
        guestId
        totalProducts
        createdOn
        updatedOn
        products {
          id
          cartId
          productId
          qty
          lastKnownPrice
        }
        user {
          id
          title
          firstName
          middleName
          lastName
          phone
          email
          marketing
          identities {
            id
            type
            value
          }
        }
        outlet {
          id
          name
          style
          legalStatus
          companyName
          charityNumber
          dropPointDescription
          createdOn
          updatedOn
          lastOrdered
        }
      }
    }
  }
`;
export type GetAbandonedCartsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAbandonedCartsQuery,
    GetAbandonedCartsQueryVariables
  >,
  'query'
>;

export const GetAbandonedCartsComponent = (props: GetAbandonedCartsComponentProps) => (
  <ApolloReactComponents.Query<GetAbandonedCartsQuery, GetAbandonedCartsQueryVariables>
    query={GetAbandonedCartsDocument}
    {...props}
  />
);

export type GetAbandonedCartsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetAbandonedCartsQuery,
    GetAbandonedCartsQueryVariables
  >;
} &
  TChildProps;
export function withGetAbandonedCarts<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAbandonedCartsQuery,
    GetAbandonedCartsQueryVariables,
    GetAbandonedCartsProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAbandonedCartsQuery,
    GetAbandonedCartsQueryVariables,
    GetAbandonedCartsProps<TChildProps, TDataName>
  >(GetAbandonedCartsDocument, {
    alias: 'getAbandonedCarts',
    ...operationOptions,
  });
}

/**
 * __useGetAbandonedCartsQuery__
 *
 * To run a query within a React component, call `useGetAbandonedCartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAbandonedCartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAbandonedCartsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetAbandonedCartsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAbandonedCartsQuery,
    GetAbandonedCartsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetAbandonedCartsQuery, GetAbandonedCartsQueryVariables>(
    GetAbandonedCartsDocument,
    baseOptions,
  );
}
export function useGetAbandonedCartsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAbandonedCartsQuery,
    GetAbandonedCartsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetAbandonedCartsQuery, GetAbandonedCartsQueryVariables>(
    GetAbandonedCartsDocument,
    baseOptions,
  );
}
export type GetAbandonedCartsQueryHookResult = ReturnType<typeof useGetAbandonedCartsQuery>;
export type GetAbandonedCartsLazyQueryHookResult = ReturnType<typeof useGetAbandonedCartsLazyQuery>;
export type GetAbandonedCartsQueryResult = ApolloReactCommon.QueryResult<
  GetAbandonedCartsQuery,
  GetAbandonedCartsQueryVariables
>;
export const GetCategoriesDocument = gql`
  query GetCategories {
    dslCategories {
      id
      parentId
      status {
        id
        value
        displayName
        description
      }
      name
      shortDescription
      longDescription
      seoTitle
      seoDescription
      seoKeywords
      seoSlug
      createdOn
      updatedOn
      subCategories {
        id
        parentId
        status {
          id
          value
          displayName
          description
        }
        name
        shortDescription
        longDescription
        seoTitle
        seoDescription
        seoKeywords
        seoSlug
        createdOn
        updatedOn
        subCategories {
          id
          parentId
          status {
            id
            value
            displayName
            description
          }
          name
          shortDescription
          longDescription
          seoTitle
          seoDescription
          seoKeywords
          seoSlug
          createdOn
          updatedOn
        }
      }
    }
  }
`;
export type GetCategoriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
  'query'
>;

export const GetCategoriesComponent = (props: GetCategoriesComponentProps) => (
  <ApolloReactComponents.Query<GetCategoriesQuery, GetCategoriesQueryVariables>
    query={GetCategoriesDocument}
    {...props}
  />
);

export type GetCategoriesProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCategoriesQuery, GetCategoriesQueryVariables>;
} &
  TChildProps;
export function withGetCategories<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
    GetCategoriesProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
    GetCategoriesProps<TChildProps, TDataName>
  >(GetCategoriesDocument, {
    alias: 'getCategories',
    ...operationOptions,
  });
}

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    baseOptions,
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    baseOptions,
  );
}
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export const GetCompanyDetailsDocument = gql`
  query GetCompanyDetails {
    getStarStockCompanyDetails {
      companyName
      address1
      address2
      city
      county
      postcode
      vatNumber
      awrs
    }
  }
`;
export type GetCompanyDetailsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables
  >,
  'query'
>;

export const GetCompanyDetailsComponent = (props: GetCompanyDetailsComponentProps) => (
  <ApolloReactComponents.Query<GetCompanyDetailsQuery, GetCompanyDetailsQueryVariables>
    query={GetCompanyDetailsDocument}
    {...props}
  />
);

export type GetCompanyDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables
  >;
} &
  TChildProps;
export function withGetCompanyDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables,
    GetCompanyDetailsProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables,
    GetCompanyDetailsProps<TChildProps, TDataName>
  >(GetCompanyDetailsDocument, {
    alias: 'getCompanyDetails',
    ...operationOptions,
  });
}

/**
 * __useGetCompanyDetailsQuery__
 *
 * To run a query within a React component, call `useGetCompanyDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompanyDetailsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCompanyDetailsQuery, GetCompanyDetailsQueryVariables>(
    GetCompanyDetailsDocument,
    baseOptions,
  );
}
export function useGetCompanyDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCompanyDetailsQuery,
    GetCompanyDetailsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCompanyDetailsQuery, GetCompanyDetailsQueryVariables>(
    GetCompanyDetailsDocument,
    baseOptions,
  );
}
export type GetCompanyDetailsQueryHookResult = ReturnType<typeof useGetCompanyDetailsQuery>;
export type GetCompanyDetailsLazyQueryHookResult = ReturnType<typeof useGetCompanyDetailsLazyQuery>;
export type GetCompanyDetailsQueryResult = ApolloReactCommon.QueryResult<
  GetCompanyDetailsQuery,
  GetCompanyDetailsQueryVariables
>;
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    dslCurrentUser {
      result
      user {
        firstName
        lastName
      }
    }
  }
`;
export type GetCurrentUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
  'query'
>;

export const GetCurrentUserComponent = (props: GetCurrentUserComponentProps) => (
  <ApolloReactComponents.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables>
    query={GetCurrentUserDocument}
    {...props}
  />
);

export type GetCurrentUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
} &
  TChildProps;
export function withGetCurrentUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
    GetCurrentUserProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
    GetCurrentUserProps<TChildProps, TDataName>
  >(GetCurrentUserDocument, {
    alias: 'getCurrentUser',
    ...operationOptions,
  });
}

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    baseOptions,
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    baseOptions,
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export const GetDocumentsDocument = gql`
  query GetDocuments($params: SupportDocumentAdminParams) {
    getAdminSupportDocuments(params: $params) {
      totalCount
      documents {
        id
        name
        url
        status {
          id
          value
          displayName
        }
      }
    }
  }
`;
export type GetDocumentsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetDocumentsQuery, GetDocumentsQueryVariables>,
  'query'
>;

export const GetDocumentsComponent = (props: GetDocumentsComponentProps) => (
  <ApolloReactComponents.Query<GetDocumentsQuery, GetDocumentsQueryVariables>
    query={GetDocumentsDocument}
    {...props}
  />
);

export type GetDocumentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetDocumentsQuery, GetDocumentsQueryVariables>;
} &
  TChildProps;
export function withGetDocuments<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetDocumentsQuery,
    GetDocumentsQueryVariables,
    GetDocumentsProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetDocumentsQuery,
    GetDocumentsQueryVariables,
    GetDocumentsProps<TChildProps, TDataName>
  >(GetDocumentsDocument, {
    alias: 'getDocuments',
    ...operationOptions,
  });
}

/**
 * __useGetDocumentsQuery__
 *
 * To run a query within a React component, call `useGetDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetDocumentsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetDocumentsQuery, GetDocumentsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(
    GetDocumentsDocument,
    baseOptions,
  );
}
export function useGetDocumentsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDocumentsQuery,
    GetDocumentsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(
    GetDocumentsDocument,
    baseOptions,
  );
}
export type GetDocumentsQueryHookResult = ReturnType<typeof useGetDocumentsQuery>;
export type GetDocumentsLazyQueryHookResult = ReturnType<typeof useGetDocumentsLazyQuery>;
export type GetDocumentsQueryResult = ApolloReactCommon.QueryResult<
  GetDocumentsQuery,
  GetDocumentsQueryVariables
>;
export const GetLogisticsFeesDocument = gql`
  query GetLogisticsFees($params: LogisticsFeesParams) {
    getAdminLogisticsFees(params: $params) {
      totalCount
      fees {
        id
        name
        logisticsType
        fee
        status {
          id
          value
          displayName
        }
      }
    }
  }
`;
export type GetLogisticsFeesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetLogisticsFeesQuery,
    GetLogisticsFeesQueryVariables
  >,
  'query'
>;

export const GetLogisticsFeesComponent = (props: GetLogisticsFeesComponentProps) => (
  <ApolloReactComponents.Query<GetLogisticsFeesQuery, GetLogisticsFeesQueryVariables>
    query={GetLogisticsFeesDocument}
    {...props}
  />
);

export type GetLogisticsFeesProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetLogisticsFeesQuery,
    GetLogisticsFeesQueryVariables
  >;
} &
  TChildProps;
export function withGetLogisticsFees<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetLogisticsFeesQuery,
    GetLogisticsFeesQueryVariables,
    GetLogisticsFeesProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetLogisticsFeesQuery,
    GetLogisticsFeesQueryVariables,
    GetLogisticsFeesProps<TChildProps, TDataName>
  >(GetLogisticsFeesDocument, {
    alias: 'getLogisticsFees',
    ...operationOptions,
  });
}

/**
 * __useGetLogisticsFeesQuery__
 *
 * To run a query within a React component, call `useGetLogisticsFeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogisticsFeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogisticsFeesQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetLogisticsFeesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetLogisticsFeesQuery,
    GetLogisticsFeesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetLogisticsFeesQuery, GetLogisticsFeesQueryVariables>(
    GetLogisticsFeesDocument,
    baseOptions,
  );
}
export function useGetLogisticsFeesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetLogisticsFeesQuery,
    GetLogisticsFeesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetLogisticsFeesQuery, GetLogisticsFeesQueryVariables>(
    GetLogisticsFeesDocument,
    baseOptions,
  );
}
export type GetLogisticsFeesQueryHookResult = ReturnType<typeof useGetLogisticsFeesQuery>;
export type GetLogisticsFeesLazyQueryHookResult = ReturnType<typeof useGetLogisticsFeesLazyQuery>;
export type GetLogisticsFeesQueryResult = ApolloReactCommon.QueryResult<
  GetLogisticsFeesQuery,
  GetLogisticsFeesQueryVariables
>;
export const GetOrdersDocument = gql`
  query GetOrders {
    dslOrders {
      id
      status {
        id
        value
        displayName
        description
      }
      userId
      subtotal
      discount
      total
      notes
      firstname
      lastname
      company
      billingLine1
      billingLine2
      billingLine3
      billingCity
      billingCounty
      billingPostcode
      billingCountry
      shippingLine1
      shippingLine2
      shippingLine3
      shippingCity
      shippingCounty
      shippingPostcode
      shippingCountry
      createdOn
      updatedOn
    }
  }
`;
export type GetOrdersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetOrdersQuery, GetOrdersQueryVariables>,
  'query'
>;

export const GetOrdersComponent = (props: GetOrdersComponentProps) => (
  <ApolloReactComponents.Query<GetOrdersQuery, GetOrdersQueryVariables>
    query={GetOrdersDocument}
    {...props}
  />
);

export type GetOrdersProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetOrdersQuery, GetOrdersQueryVariables>;
} &
  TChildProps;
export function withGetOrders<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetOrdersQuery,
    GetOrdersQueryVariables,
    GetOrdersProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetOrdersQuery,
    GetOrdersQueryVariables,
    GetOrdersProps<TChildProps, TDataName>
  >(GetOrdersDocument, {
    alias: 'getOrders',
    ...operationOptions,
  });
}

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GetOrdersDocument,
    baseOptions,
  );
}
export function useGetOrdersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(
    GetOrdersDocument,
    baseOptions,
  );
}
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = ApolloReactCommon.QueryResult<
  GetOrdersQuery,
  GetOrdersQueryVariables
>;
export const GetOutletByIdDocument = gql`
  query GetOutletById($id: Int!) {
    getAdminOutletByID(outletId: $id) {
      id
      name
      style
      status {
        value
        displayName
        id
      }
      legalStatus
      companyName
      charityNumber
      dropPointDescription
      createdOn
      addressBook {
        billingId
        shippingId
        addresses {
          ...AddressFields
        }
      }
    }
  }
  ${AddressFieldsFragmentDoc}
`;
export type GetOutletByIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetOutletByIdQuery, GetOutletByIdQueryVariables>,
  'query'
> &
  ({ variables: GetOutletByIdQueryVariables; skip?: boolean } | { skip: boolean });

export const GetOutletByIdComponent = (props: GetOutletByIdComponentProps) => (
  <ApolloReactComponents.Query<GetOutletByIdQuery, GetOutletByIdQueryVariables>
    query={GetOutletByIdDocument}
    {...props}
  />
);

export type GetOutletByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetOutletByIdQuery, GetOutletByIdQueryVariables>;
} &
  TChildProps;
export function withGetOutletById<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetOutletByIdQuery,
    GetOutletByIdQueryVariables,
    GetOutletByIdProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetOutletByIdQuery,
    GetOutletByIdQueryVariables,
    GetOutletByIdProps<TChildProps, TDataName>
  >(GetOutletByIdDocument, {
    alias: 'getOutletById',
    ...operationOptions,
  });
}

/**
 * __useGetOutletByIdQuery__
 *
 * To run a query within a React component, call `useGetOutletByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOutletByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOutletByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOutletByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetOutletByIdQuery, GetOutletByIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetOutletByIdQuery, GetOutletByIdQueryVariables>(
    GetOutletByIdDocument,
    baseOptions,
  );
}
export function useGetOutletByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetOutletByIdQuery,
    GetOutletByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetOutletByIdQuery, GetOutletByIdQueryVariables>(
    GetOutletByIdDocument,
    baseOptions,
  );
}
export type GetOutletByIdQueryHookResult = ReturnType<typeof useGetOutletByIdQuery>;
export type GetOutletByIdLazyQueryHookResult = ReturnType<typeof useGetOutletByIdLazyQuery>;
export type GetOutletByIdQueryResult = ApolloReactCommon.QueryResult<
  GetOutletByIdQuery,
  GetOutletByIdQueryVariables
>;
export const GetOutletsDocument = gql`
  query GetOutlets($params: OutletAdminParams) {
    getAdminOutlets(params: $params) {
      totalCount
      outlets {
        id
        name
        status {
          displayName
        }
        style
        createdOn
        addressBook {
          shippingId
        }
      }
    }
  }
`;
export type GetOutletsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetOutletsQuery, GetOutletsQueryVariables>,
  'query'
>;

export const GetOutletsComponent = (props: GetOutletsComponentProps) => (
  <ApolloReactComponents.Query<GetOutletsQuery, GetOutletsQueryVariables>
    query={GetOutletsDocument}
    {...props}
  />
);

export type GetOutletsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetOutletsQuery, GetOutletsQueryVariables>;
} &
  TChildProps;
export function withGetOutlets<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetOutletsQuery,
    GetOutletsQueryVariables,
    GetOutletsProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetOutletsQuery,
    GetOutletsQueryVariables,
    GetOutletsProps<TChildProps, TDataName>
  >(GetOutletsDocument, {
    alias: 'getOutlets',
    ...operationOptions,
  });
}

/**
 * __useGetOutletsQuery__
 *
 * To run a query within a React component, call `useGetOutletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOutletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOutletsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetOutletsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetOutletsQuery, GetOutletsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetOutletsQuery, GetOutletsQueryVariables>(
    GetOutletsDocument,
    baseOptions,
  );
}
export function useGetOutletsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOutletsQuery, GetOutletsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetOutletsQuery, GetOutletsQueryVariables>(
    GetOutletsDocument,
    baseOptions,
  );
}
export type GetOutletsQueryHookResult = ReturnType<typeof useGetOutletsQuery>;
export type GetOutletsLazyQueryHookResult = ReturnType<typeof useGetOutletsLazyQuery>;
export type GetOutletsQueryResult = ApolloReactCommon.QueryResult<
  GetOutletsQuery,
  GetOutletsQueryVariables
>;
export const ProductByIdDocument = gql`
  query ProductById($id: ID!) {
    dslProductById(id: $id) {
      ...DslProductFields
    }
  }
  ${DslProductFieldsFragmentDoc}
`;
export type ProductByIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<ProductByIdQuery, ProductByIdQueryVariables>,
  'query'
> &
  ({ variables: ProductByIdQueryVariables; skip?: boolean } | { skip: boolean });

export const ProductByIdComponent = (props: ProductByIdComponentProps) => (
  <ApolloReactComponents.Query<ProductByIdQuery, ProductByIdQueryVariables>
    query={ProductByIdDocument}
    {...props}
  />
);

export type ProductByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<ProductByIdQuery, ProductByIdQueryVariables>;
} &
  TChildProps;
export function withProductById<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ProductByIdQuery,
    ProductByIdQueryVariables,
    ProductByIdProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    ProductByIdQuery,
    ProductByIdQueryVariables,
    ProductByIdProps<TChildProps, TDataName>
  >(ProductByIdDocument, {
    alias: 'productById',
    ...operationOptions,
  });
}

/**
 * __useProductByIdQuery__
 *
 * To run a query within a React component, call `useProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ProductByIdQuery, ProductByIdQueryVariables>(
    ProductByIdDocument,
    baseOptions,
  );
}
export function useProductByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ProductByIdQuery, ProductByIdQueryVariables>(
    ProductByIdDocument,
    baseOptions,
  );
}
export type ProductByIdQueryHookResult = ReturnType<typeof useProductByIdQuery>;
export type ProductByIdLazyQueryHookResult = ReturnType<typeof useProductByIdLazyQuery>;
export type ProductByIdQueryResult = ApolloReactCommon.QueryResult<
  ProductByIdQuery,
  ProductByIdQueryVariables
>;
export const GetProductsDocument = gql`
  query GetProducts($params: DslProductAdminParams) {
    getAdminProducts(params: $params) {
      products {
        id
        status {
          id
          value
          displayName
          description
        }
        type
        name
        shortDescription
        longDescription
        code
        price {
          subtotal
          vat
          total
        }
        mainImage {
          id
          productId
          type
          fullSizePath
          thumbnailPath
          createdOn
          updatedOn
        }
      }
      totalCount
    }
  }
`;
export type GetProductsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetProductsQuery, GetProductsQueryVariables>,
  'query'
>;

export const GetProductsComponent = (props: GetProductsComponentProps) => (
  <ApolloReactComponents.Query<GetProductsQuery, GetProductsQueryVariables>
    query={GetProductsDocument}
    {...props}
  />
);

export type GetProductsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetProductsQuery, GetProductsQueryVariables>;
} &
  TChildProps;
export function withGetProducts<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetProductsQuery,
    GetProductsQueryVariables,
    GetProductsProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetProductsQuery,
    GetProductsQueryVariables,
    GetProductsProps<TChildProps, TDataName>
  >(GetProductsDocument, {
    alias: 'getProducts',
    ...operationOptions,
  });
}

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    baseOptions,
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    baseOptions,
  );
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = ApolloReactCommon.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export const GetTaxCodeByIdDocument = gql`
  query GetTaxCodeById($id: Int!) {
    getTaxCodeById(id: $id) {
      id
      name
      code
      rate
      calculationType
      status {
        id
        value
        displayName
      }
    }
  }
`;
export type GetTaxCodeByIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetTaxCodeByIdQuery, GetTaxCodeByIdQueryVariables>,
  'query'
> &
  ({ variables: GetTaxCodeByIdQueryVariables; skip?: boolean } | { skip: boolean });

export const GetTaxCodeByIdComponent = (props: GetTaxCodeByIdComponentProps) => (
  <ApolloReactComponents.Query<GetTaxCodeByIdQuery, GetTaxCodeByIdQueryVariables>
    query={GetTaxCodeByIdDocument}
    {...props}
  />
);

export type GetTaxCodeByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetTaxCodeByIdQuery, GetTaxCodeByIdQueryVariables>;
} &
  TChildProps;
export function withGetTaxCodeById<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetTaxCodeByIdQuery,
    GetTaxCodeByIdQueryVariables,
    GetTaxCodeByIdProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetTaxCodeByIdQuery,
    GetTaxCodeByIdQueryVariables,
    GetTaxCodeByIdProps<TChildProps, TDataName>
  >(GetTaxCodeByIdDocument, {
    alias: 'getTaxCodeById',
    ...operationOptions,
  });
}

/**
 * __useGetTaxCodeByIdQuery__
 *
 * To run a query within a React component, call `useGetTaxCodeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaxCodeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaxCodeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaxCodeByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetTaxCodeByIdQuery,
    GetTaxCodeByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetTaxCodeByIdQuery, GetTaxCodeByIdQueryVariables>(
    GetTaxCodeByIdDocument,
    baseOptions,
  );
}
export function useGetTaxCodeByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetTaxCodeByIdQuery,
    GetTaxCodeByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetTaxCodeByIdQuery, GetTaxCodeByIdQueryVariables>(
    GetTaxCodeByIdDocument,
    baseOptions,
  );
}
export type GetTaxCodeByIdQueryHookResult = ReturnType<typeof useGetTaxCodeByIdQuery>;
export type GetTaxCodeByIdLazyQueryHookResult = ReturnType<typeof useGetTaxCodeByIdLazyQuery>;
export type GetTaxCodeByIdQueryResult = ApolloReactCommon.QueryResult<
  GetTaxCodeByIdQuery,
  GetTaxCodeByIdQueryVariables
>;
export const GetTaxCodesDocument = gql`
  query GetTaxCodes($params: TaxCodesAdminParams) {
    getAdminTaxCodes(params: $params) {
      totalCount
      taxCodes {
        id
        name
        status {
          id
          value
          displayName
        }
        calculationType
        rate
      }
    }
  }
`;
export type GetTaxCodesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetTaxCodesQuery, GetTaxCodesQueryVariables>,
  'query'
>;

export const GetTaxCodesComponent = (props: GetTaxCodesComponentProps) => (
  <ApolloReactComponents.Query<GetTaxCodesQuery, GetTaxCodesQueryVariables>
    query={GetTaxCodesDocument}
    {...props}
  />
);

export type GetTaxCodesProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetTaxCodesQuery, GetTaxCodesQueryVariables>;
} &
  TChildProps;
export function withGetTaxCodes<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetTaxCodesQuery,
    GetTaxCodesQueryVariables,
    GetTaxCodesProps<TChildProps, TDataName>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetTaxCodesQuery,
    GetTaxCodesQueryVariables,
    GetTaxCodesProps<TChildProps, TDataName>
  >(GetTaxCodesDocument, {
    alias: 'getTaxCodes',
    ...operationOptions,
  });
}

/**
 * __useGetTaxCodesQuery__
 *
 * To run a query within a React component, call `useGetTaxCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaxCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaxCodesQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetTaxCodesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetTaxCodesQuery, GetTaxCodesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetTaxCodesQuery, GetTaxCodesQueryVariables>(
    GetTaxCodesDocument,
    baseOptions,
  );
}
export function useGetTaxCodesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTaxCodesQuery, GetTaxCodesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetTaxCodesQuery, GetTaxCodesQueryVariables>(
    GetTaxCodesDocument,
    baseOptions,
  );
}
export type GetTaxCodesQueryHookResult = ReturnType<typeof useGetTaxCodesQuery>;
export type GetTaxCodesLazyQueryHookResult = ReturnType<typeof useGetTaxCodesLazyQuery>;
export type GetTaxCodesQueryResult = ApolloReactCommon.QueryResult<
  GetTaxCodesQuery,
  GetTaxCodesQueryVariables
>;
