import get from 'lodash.get';
import sortBy from 'lodash.sortby';
import moment from 'moment';
import formatCurrency from '../filters/currency';
import { formatPrice } from '../filters/currency';
import { Product, TopSkuProduct } from 'types/product';
import { Category } from 'types/category';
import {
  SavedSearch,
  Search,
  Tax,
  ViewTool,
  Order,
  OrderDetails,
  PaymentMethod,
  User,
  OptionType,
  UserPricing,
  ProductFilterItem,
} from 'types';

type AnyObject = {
  [key: string]: any;
};

function getDisplayPrice(product: any): number {
  if (get(product, 'taxIds[0]') === 6) {
    return (product.price * 20) / 100 + product.price;
  }
  return parseFloat(product.price);
}

function getCategoryIds(data: any): number[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (typeof data === 'object') {
    return Object.values(data);
  }

  return [];
}

function getProductStatus(status: string): string {
  switch (status) {
    case 'Y':
      return 'Yes';
    case 'N':
      return 'No';
    case 'P':
      return 'Pending';
    default:
      return '';
  }
}

function getFullName(data: { firstname?: string; lastname?: string }) {
  return [data.firstname, data.lastname].filter((o) => o).join(' ');
}

export function formatProduct(product: any): Product {
  const features = get(product, 'features') || get(product, 'productFeatures');
  return {
    id: product.productId,
    code: product.productCode,
    name: product.product,
    updatedTimestamp: product.updatedTimestamp,
    updatedPricingTimestamp: product.updatedPricingTimestamp
      ? moment(product.updatedPricingTimestamp, 'X').format('DD/MM/YYYY \n HH:mm')
      : '',
    hasVat: product.taxIds && product.taxIds !== '',
    price: formatPrice(parseFloat(product.price)),
    inputPrice: formatPrice(parseFloat(get(features, '95.value')) || 0),
    logisticFee: formatPrice(parseFloat(get(features, '97.value')) || 0),
    displayPrice: getDisplayPrice(product),
    status: product.status,
    categoryId: product.mainCategory,
    features: product.productFeatures,
    approved: getProductStatus(product.approved),
    categoryIds: getCategoryIds(product.categoryIds),
    fullDescription: product.fullDescription,
    taxIds: product.taxIds,
    qty: parseInt(product.amount) || null,
    taxValue: product.taxValue,
    subTotal: product.subtotal,
    total: product.subtotal,
    availableFrom: product.availSince,
    mainPair: product.mainPair
      ? {
          id: product.mainPair.pairId,
          imageId: product.mainPair.detailedId,
        }
      : null,
    image: get(product, 'mainPair.detailed.httpImagePath'),
  };
}

export function formatProducts(products: any): Product[] {
  if (typeof products === 'object') {
    return products.map((o: any) => formatProduct(o));
  }

  return [];
}

export function setProductCategory(products: Product[], categories: any): Product[] {
  if (Array.isArray(categories)) {
    let cachedCategories: AnyObject = {};
    for (let category of categories) {
      cachedCategories[category.id] = category;
    }
    for (let product of products) {
      const category = cachedCategories[product.categoryId];
      if (category) {
        product.categoryName = category.name;
      }
    }
  }

  return products;
}

export function formatTopSkus(products: any): TopSkuProduct[] {
  if (Array.isArray(products)) {
    return products.map((product) => {
      return {
        amount: parseInt(product.total),
        name: product.product,
        code: product.productCode,
        image: get(product, 'mainPair.detailed.httpImagePath'),
      };
    });
  }

  return [];
}

export function getGeneralStats(data: any) {
  return {
    income: get(data, 'orderStat.ordersTotal.grossTotal'),
    orders: get(data, 'orderStat.diff.ordersCount'),
    products: get(data, 'generalStats.products.totalProducts'),
  };
}

export function formatOrders(orders: any): Order[] {
  if (Array.isArray(orders)) {
    return orders.map((order) => {
      return {
        id: order.orderId,
        customer: {
          email: order.email,
          phone: order.phone,
          lastName: order.lastname,
          firstName: order.firstname,
          fullName: getFullName(order),
          outlet: order.outletName,
        },
        createdAt: order.timestamp,
        date: moment(order.timestamp, 'X').format('DD/MM/YYYY, HH:mm'),
        status: order.status,
        total: parseFloat(order.total),
        subtotal: parseFloat(order.subtotal),
      };
    });
  }

  return [];
}

export function formatGraphData(data: any) {
  if (data.dashboardStatisticsSalesChart) {
    const rs = Object.entries(data.dashboardStatisticsSalesChart).map((o) => {
      const [key, value] = o;
      const isDay = !key.includes('1)');
      const date = moment(key.replace('1)', '').replace('(', ''), isDay ? 'HH' : 'YYYY, M,D');
      return {
        date: date.format(isDay ? 'HH:mm' : 'DD/MM'),
        sortValue: parseInt(date.format('X')),
        value: (value as any).cur,
      };
    });

    return sortBy(rs, (item) => item.sortValue);
  }
}

export function formatCategories(categories: any): Category[] {
  if (Array.isArray(categories)) {
    return categories.map((category) => {
      return {
        id: category.categoryId,
        name: category.category,
        level: category.level,
        parent: category.parentId,
      };
    });
  }
  return [];
}

export function formatSavedSearches(data: any): SavedSearch[] {
  if (typeof data === 'object') {
    return Object.values(data).map((item: any) => {
      return {
        id: item.viewId,
        name: item.name,
      };
    });
  }

  return [];
}

export function formatSearchConfig(data: any): Search {
  const rs = {
    totalItems: parseInt(data.totalItems),
    perPage: parseInt(data.itemsPerPage),
    totalPage: 0,
  };

  rs.totalPage = Math.ceil(rs.totalItems / rs.perPage);

  return rs;
}

export function formatPaymentMethods(data: any): PaymentMethod[] {
  if (typeof data === 'object') {
    return Object.keys(data).map((key) => ({ id: key, name: data[key] }));
  }

  return [];
}

export function formatOrderDetail(data: any): OrderDetails {
  return {
    id: data.orderId,
    createdAt: data.timestamp,
    customer: {
      email: data.email,
      phone: data.phone,
      ip: data.ipAddress,
      firstName: data.firstname,
      lastName: data.lastname,
      fullName: getFullName(data),
    },
    billing: {
      firstName: data.bFirstname,
      lastName: data.bLastname,
      fullName: getFullName({ firstname: data.bFirstname, lastname: data.bLastname }),
      address: data.bAddress,
      address2: data.bAddress2,
      phone: data.Phone,
      city: data.City,
      zip: data.bZipcode,
      stateDescription: data.bStateDescr,
      countryDescription: data.bCountryDescr,
      addressType: data.sAddressType,
    },
    shipping: {
      firstName: data.sFirstname,
      lastName: data.sLastname,
      fullName: getFullName({ firstname: data.sFirstname, lastname: data.sLastname }),
      address: data.sAddress,
      address2: data.sAddress2,
      phone: data.sPhone,
      city: data.sCity,
      zip: data.sZipcode,
      stateDescription: data.sStateDescr,
      countryDescription: data.sCountryDescr,
      addressType: data.sAddressType,
    },
    paymentMethod: {
      name: get(data, 'paymentMethod.payment'),
    },
    products: formatProducts(Object.values(data.products)),
    total: parseFloat(data.total),
    subtotal: parseFloat(data.displaySubtotal),
    status: data.status,
    date: moment(data.timestamp, 'X').format('DD/MM/YYYY, HH:mm'),
    taxes: formatTaxes(data.taxes),
    customerNotes: data.notes,
    staffNotes: data.details,
  };
}

function formatTaxes(taxes: any): Tax[] {
  return Object.values(taxes).map((o: any) => {
    const rateValue =
      o.rateType === 'P' ? `${parseFloat(o.rateValue)}%` : formatCurrency(o.rateValue);
    return { name: o.description, value: o.taxSubtotal, rateType: o.rateType, rateValue };
  });
}

export function formatViewTools(data: any): ViewTool {
  return {
    prevId: data?.prevId || '',
    nextId: data?.nextId || '',
    label: data?.linksLabel || '',
  };
}

function formatReportTable(table: any) {
  if (!table.values) {
    return null;
  }
  const headers = [
    { name: table.parameter, value: 'item' },
    ...Object.values(table.intervals).map((o: any) => ({
      name: o.description,
      value: o.interval_id,
    })),
  ];

  const items = [
    ...Object.values(table.elements).map((o: any) => ({
      item: o.description,
      ...table.values[o.element_hash],
    })),
    { item: 'Total', ...table.totals },
  ];

  return {
    headers,
    items,
  };
}

function formatChartData(data: any) {
  if (!data) {
    return null;
  }
  return data.map((o: any) => ({ label: o.label, value: o.count }));
}

export function formatReportData(data: any) {
  return {
    table: formatReportTable(data.table),
    chart: formatChartData(data.chart_data),
  };
}

export function formatUsers(data: any): User[] {
  return data.map((user: any) => {
    return {
      firstName: user.firstname,
      lastName: user.lastname,
      fullName: getFullName(user),
      status: user.status,
      email: user.email,
      id: user.userId,
      address: user.sAddress,
      outletName: user.outletName,
      outletStyle: user.outletStyle,
      city: user.sCity,
      county: user.state,
      zipCode: user.sZipcode,
    } as User;
  });
}

export function formatOutletStyles(data: any): OptionType[] {
  const rs: OptionType[] = [];

  for (let [key, value] of Object.entries(data.c['36'].values)) {
    rs.push({
      label: value as string,
      value: key,
    });
  }

  return rs;
}

export function formatUserPricing(data: any): UserPricing[] {
  return data.map((item: any) => {
    return {
      id: item.starstockUserPriceId,
      outletName: item.outletName,
      product: {
        id: item.productId,
        code: item.productCode,
        name: item.product,
      },
      inputPrice: item.inputPrice,
      sellOutPrice: item.price,
      logisticFee: item.log,
    } as UserPricing;
  });
}

export function formatProductFilters(data: any): ProductFilterItem[] {
  return Object.values(data || {}).map((item: any) => {
    item.variants = Object.values(item.variants || {});
    return item;
  });
}

export function formatProductFeatures(data: any) {
  return Object.values(data || {}).map((item: any) => {
    item.variants = Object.values(item.variants || {});
    return item;
  });
}
