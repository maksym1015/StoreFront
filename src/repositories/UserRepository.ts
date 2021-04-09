import Repository from './Repository';
import {
  formatUsers,
  formatSearchConfig,
  formatOutletStyles,
  formatUserPricing,
} from 'utils/format-data';
import handleAjaxNotification from 'utils/handle-ajax-notification';
import { PLACEHOLDER_PASSWORD, REQUEST_NAME } from 'utils/constant';

interface UpdateStatusParams {
  notifyUser?: boolean;
  status: string;
}

interface UserSearchParams {
  currentPage?: number;
  perPage?: number;
  status?: string;
  name?: string;
  email?: string;
  sortBy?: string;
  sortOrder?: string;
  userId?: string;
  userType?: string;
  outlet?: string;
  outletStyle?: string;
}

interface UserPricingSearchParams {
  currentPage?: number;
  perPage?: number;
  outlet: string;
  product: string;
  sortBy: string;
  sortOrder: string;
}

interface PostUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id?: string;
  status?: string;
}

interface CreateUserPricingParams {
  outlet: string;
  price: string;
  products: string;
}

function composeCreateUserPricingParams(params: CreateUserPricingParams) {
  const formData = new FormData();
  formData.append('dispatch[starstock_pricing.add]', '');
  formData.append('starstock_pricing[user_id]', params.outlet);
  formData.append('starstock_pricing[product_id]', params.products);
  formData.append('starstock_pricing[input_price]', params.price);
  formData.append('is_ajax', '1');
  return formData;
}

function composeUserParams(params: UserSearchParams) {
  let query: { [key: string]: any } = {};

  query = {
    dispatch: 'profiles.manage',
    user_type: params.userType || 'V',
    page: params.currentPage,
    items_per_page: params.perPage,
    status: params.status,
    user_id: params.userId,
    is_search: 'Y',
    name: params.name,
    email: params.email,
    outlet: params.outlet,
    outlet_style: params.outletStyle,
  };

  query.sort_by = params.sortBy || 'name';
  query.sort_order = (params.sortOrder || 'descend') === 'ascend' ? 'asc' : 'desc';

  return query;
}

function composeUserPricingParams(params: UserPricingSearchParams) {
  let query: { [key: string]: any } = {};

  query = {
    dispatch: 'starstock_pricing.manage',
    page: params.currentPage,
    items_per_page: params.perPage,
    is_search: 'Y',
    outlet: params.outlet,
    product: params.product,
  };

  query.sort_by = params.sortBy || 'product';
  query.sort_order = (params.sortOrder || 'descend') === 'ascend' ? 'asc' : 'desc';

  return query;
}

function composePostUserParams(params: PostUserParams) {
  if (params.password === PLACEHOLDER_PASSWORD) {
    params.password = '';
  }

  const query = {
    notify_customer: 'N',
    user_id: params.id || '0',
    user_type: 'V',
    [params.id ? 'dispatch[profiles.update]' : 'dispatch[profiles.add]']: '1',
    fake: '1',
    'user_data[status]': params.status || 'A',
    'user_data[user_type]': 'V',
    'user_data[email]': params.email,
    'user_data[password1]': params.password,
    'user_data[password2]': params.password,
    'user_data[firstname]': params.firstName,
    'user_data[lastname]': params.lastName,
    'user_data[fields][43]': '16',
  };

  const formData = new FormData();
  formData.append('is_ajax', '1');

  for (let [key, value] of Object.entries(query)) {
    if (typeof value !== 'undefined') {
      formData.append(key, value);
    }
  }

  return formData;
}

export default {
  async findOUtlet(q: string) {
    const { data } = await Repository.get('/v2', {
      params: {
        q,
        dispatch: 'starstock_d2l.find_outlet',
      },
    });
    return {
      users: formatUsers(data.users),
    };
  },

  async get(params: UserSearchParams) {
    const { data } = await Repository.get('/v2', {
      params: composeUserParams(params),
    });

    return {
      users: formatUsers(data.users),
      search: formatSearchConfig(data.search),
      outletStyles: formatOutletStyles(data.profileFields),
    };
  },
  async getUserPricing(params: UserPricingSearchParams) {
    const { data } = await Repository.get('/v2', {
      params: composeUserPricingParams(params),
    });

    return {
      items: formatUserPricing(data.items),
      search: formatSearchConfig(data.search),
    };
  },
  async deleteUserPricing(ids: string[]) {
    const formData = new FormData();
    formData.append('is_ajax', '1');
    formData.append('fake', '1');
    for (let id of ids) {
      formData.append('starstock_user_price_ids[]', id);
    }
    formData.append('dispatch[starstock_pricing.m_delete]', '');

    const { data } = await Repository.post('/v2', formData);

    return handleAjaxNotification(data);
  },
  async updateStatus(id: string, params: UpdateStatusParams) {
    const formData = new FormData();
    formData.append('is_ajax', '1');

    const { data } = await Repository.post('/v2', formData, {
      params: {
        dispatch: 'profiles.update_status',
        id,
        status: params.status,
        notify_user: params.notifyUser ? 'Y' : 'N',
        requestName: REQUEST_NAME.UPDATE_USER,
      },
    });

    return handleAjaxNotification(data);
  },

  async deleteUsers(ids: string[]) {
    const formData = new FormData();
    formData.append('fake', '1');
    formData.append('is_ajax', '1');
    formData.append('dispatch[profiles.m_delete]', '');
    for (const id of ids) {
      formData.append('user_ids[]', id);
    }
    const res = await Repository.post('/v2', formData, {
      params: {
        requestName: REQUEST_NAME.UPDATE_USER,
      },
    });

    return handleAjaxNotification(res.data);
  },

  async postUser(params: PostUserParams) {
    const { data } = await Repository.post('/v2', composePostUserParams(params), {
      params: {
        requestName: REQUEST_NAME.UPDATE_USER,
      },
    });
    return handleAjaxNotification(data);
  },

  async createUserPricing(params: CreateUserPricingParams) {
    const { data } = await Repository.post('/v2', composeCreateUserPricingParams(params));
    return handleAjaxNotification(data);
  },

  async createSavedSearch() {
    return '';
  },

  async deleteSavedSearch() {},
};
