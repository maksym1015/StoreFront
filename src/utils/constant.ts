export const PRODUCT_STATUSES = [
  {
    label: 'Active',
    value: 'A',
  },
  {
    label: 'Hidden',
    value: 'H',
  },
  {
    label: 'Disabled',
    value: 'D',
  },
];

export const YES_NO_OPTIONS = [
  {
    label: '--',
    value: null,
  },
  {
    label: 'Yes',
    value: 'Y',
  },
  {
    label: 'No',
    value: 'N',
  },
];

export const PER_PAGE_OPTIONS = [
  {
    label: '10 per page',
    value: 10,
  },
  {
    label: '25 per page',
    value: 25,
  },
  {
    label: '50 per page',
    value: 50,
  },
  {
    label: '100 per page',
    value: 100,
  },
  {
    label: '250 per page',
    value: 250,
  },
];

export const LOCAL_STORAGE_KEYS = {
  PRODUCTS_PER_PAGE: 'product_per_page',
  ORDERS_PER_PAGE: 'order_per_page',
};

export const PRICING_BULK_OPTIONS = [
  {
    label: 'Delete selected',
    value: 'delete',
  },
  {
    label: 'Clone selected',
    value: 'clone',
  },
  {
    label: 'Edit selected',
    value: 'edit',
  },
];

export const ORDER_BULK_OPTIONS = [
  {
    label: 'Invoice bulk print (PDF)',
    value: 'print-pdf',
  },
  {
    label: 'Invoice bulk print',
    value: 'print',
  },
];

export const DEFAULT_PER_PAGE = 10;

export const PERIOD_OPTIONS = [
  {
    label: 'All',
    value: 'A',
    separator: true,
  },
  {
    label: 'This day',
    value: 'D',
  },
  {
    label: 'This week',
    value: 'W',
  },
  {
    label: 'This month',
    value: 'M',
  },
  {
    label: 'This year',
    value: 'Y',
    separator: true,
  },
  {
    label: 'Yesterday',
    value: 'LD',
  },
  {
    label: 'Previous week',
    value: 'LW',
  },
  {
    label: 'Previous month',
    value: 'LM',
  },
  {
    label: 'Previous year',
    value: 'LY',
    separator: true,
  },
  {
    label: 'Last 24 hours',
    value: 'HH',
  },
  {
    label: 'Last 7 days',
    value: 'HW',
  },
  {
    label: 'Last 30 days',
    value: 'HM',
    separator: true,
  },
  {
    label: 'Custom',
    value: 'C',
  },
];

export const PLACEHOLDER_PASSWORD = `        `;

export enum REQUEST_NAME {
  UPDATE_USER_STATUS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_PRODUCT,
}

export const DATE_RANGES = [
  {
    label: 'All',
    value: 'A',
  },
  [
    {
      label: 'This day',
      value: 'D',
    },
    {
      label: 'This week',
      value: 'W',
    },
    {
      label: 'This month',
      value: 'M',
    },
    {
      label: 'This year',
      value: 'Y',
    },
  ],
  [
    {
      label: 'Yesterday',
      value: 'LD',
    },
    {
      label: 'Previous week',
      value: 'LW',
    },
    {
      label: 'Previous month',
      value: 'LM',
    },
    {
      label: 'Previous year',
      value: 'LY',
    },
  ],
  [
    {
      label: 'Last 24 hours',
      value: 'HH',
    },
    {
      label: 'Last 7 days',
      value: 'HW',
    },
    {
      label: 'Last 30 days',
      value: 'HM',
    },
  ],
  {
    label: 'Custom',
    value: 'C',
  },
];

export enum ProductFeatureType {
  CHECK_BOX_SINGLE = 'C',
  CHECK_BOX_MULTI = 'M',
  SELECT_BOX_TEXT = 'S',
  SELECT_BOX_NUMBER = 'N',
  SELECT_BOX_BRAND = 'E',
  TEXT = 'T',
  NUMBER = 'O',
  DATE = 'D',
}

export const PUBLIC_ROUTES = ['/login'];
