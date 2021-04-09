import { ParsedUrlQuery } from 'querystring';
import moment from 'moment';

export function getRunTimeUniqId(prefix = 'run-time-id') {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getRandomColorHex() {
  let hex = '0123456789ABCDEF';
  let color = '#';
  for (let i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function isSelection(): boolean {
  const selection = window.getSelection();

  return Boolean(selection && selection.toString().length > 0);
}

const intKeys = ['status'];
const dateKeys = ['createdFrom', 'createdTo', 'updatedFrom', 'updatedTo'];

export function parseQueryFromRouteQuery(query: any) {
  const newQuery = { ...query };
  for (let key in newQuery) {
    if (intKeys.includes(key)) {
      newQuery[key] = newQuery[key] ? parseInt(newQuery[key]) : '';
    }
    if (dateKeys.includes(key)) {
      newQuery[key] = query[key] ? moment(query[key], 'DD/MM/YYYY') : '';
    }
  }

  return newQuery;
}

export function getListingQuery(query: ParsedUrlQuery) {
  let params: any = parseQueryFromRouteQuery(query);

  for (let [key, value] of Object.entries(query)) {
    if (value === '') {
      delete query[key];
    }
  }

  params = {
    ...query,
    pagination: {
      page: parseInt(query.currentPage as string) || 1,
      perPage: parseInt(query.perPage as string),
    },
  };

  if (query.sortBy && query.sortOrder) {
    params.sort = {
      by: query.sortBy,
      direction: query.sortOrder === 'ascend' ? 'asc' : 'desc',
    };
  }

  return params;
}

export function waitFor(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
