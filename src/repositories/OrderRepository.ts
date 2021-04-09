import Repository from './Repository';
import {
  formatOrders,
  formatSearchConfig,
  formatSavedSearches,
  formatPaymentMethods,
  formatOrderDetail,
  formatViewTools,
} from 'utils/format-data';
import Url from 'url-parse';
import handleAjaxNotification from 'utils/handle-ajax-notification';
import { saveAs } from 'file-saver';
import { OrdersResponse } from 'types';

const statusMapping: { [key: string]: string | null } = {
  all: null,
  processing: 'O',
  completed: 'C',
  canceled: 'D',
};

interface OrderSearchParams {
  currentPage?: number;
  perPage?: number;
  savedSearchId?: string;
  status?: string;
  customer?: string;
  email?: string;
  phone?: string;
  totalFrom?: number;
  totalTo?: number;
  sortBy?: string;
  sortOrder?: string;
  statuses?: string[];
  timeFrom?: string;
  timeTo?: string;
  orderId?: string;
  company?: string;
  advancedSearch?: string;
  productSavedSearch?: string;
  orderedProducts?: string;
  period?: string;
  outlet?: string;
}

interface CreateSavedSearchParams extends OrderSearchParams {
  savedSearchName: string;
}

interface UpdateStatusParams {
  status: string;
  notifyDepartment?: string;
  notifyVendor?: string;
  notifyCustomer?: string;
}

interface UpdateOrderDetailsParams {
  customerNotes?: string;
  staffNotes?: string;
  [key: string]: any;
}

function composeOrderParams(params: OrderSearchParams) {
  let query: { [key: string]: any } = {};

  if (params.savedSearchId) {
    query = {
      dispatch: 'orders.manage',
      view_id: params.savedSearchId,
      page: params.currentPage,
      items_per_page: params.perPage,
    };
  } else {
    query = {
      page: params.currentPage,
      items_per_page: params.perPage,
      status: params.statuses
        ? params.statuses
        : params.status
        ? statusMapping[params.status]
        : null,
      is_search: 'Y',
      cname: params.customer,
      outlet: params.outlet,
      email: params.email,
      phone: params.phone,
      total_from: params.totalFrom,
      total_to: params.totalTo,
      time_from: params.timeFrom,
      time_to: params.timeTo,
      order_id: params.orderId,
      company: params.company,
      product_view_id: params.productSavedSearch,
      period: params.period || 'A',
      p_ids: params.orderedProducts,
    };

    if (params.advancedSearch) {
      query['dispatch[orders.manage]'] = 'Search';
    } else {
      query.dispatch = 'orders.manage';
    }
  }

  query.sort_by = params.sortBy || 'date';
  query.sort_order = (params.sortOrder || 'descend') === 'ascend' ? 'asc' : 'desc';

  return query;
}

export default {
  async get(params: OrderSearchParams = {}): Promise<OrdersResponse> {
    const { data } = await Repository.get('/v2', {
      params: composeOrderParams(params),
    });

    const orders = formatOrders(data.orders);
    return {
      orders,
      total: parseFloat(data.totalExVat?.grossTotal),
      totalCompleted: parseFloat(data.totalExVat?.totallyPaid),
      search: formatSearchConfig(data.search),
      paymentMethods: formatPaymentMethods(data.payments),
      savedSearches: formatSavedSearches(data.savedSearches),
      productSavedSearches: formatSavedSearches(data.productSavedSearches),
    };
  },
  async createSavedSearch(params: CreateSavedSearchParams) {
    const { data } = await Repository.get('/', {
      params: {
        is_ajax: '1',
        new_view: params.savedSearchName,
        ...composeOrderParams(params),
        dispatch: null,
        'dispatch[orders.manage.save_view]': 'Search',
      },
    });

    if (data.currentUrl) {
      const url = new Url(data.currentUrl, true);
      return url.query.view_id || '';
    }

    return '';
  },

  async deleteSavedSearch(id: string) {
    await Repository.get('/', {
      params: {
        'dispatch[orders.manage.delete_view]': 'Search',
        is_ajax: '1',
        view_id: id,
      },
    });
  },
  async downloadPdf(ids: string[]) {
    const formData = new FormData();
    formData.append('dispatch[orders.bulk_print..pdf]', '1');
    for (let id of ids) {
      formData.append('order_ids[]', id);
    }
    const data = await Repository.post('/', formData, {
      responseType: 'blob',
    });
    const fileName = data.headers['content-disposition'].split('filename="')[1].replace('"', '');
    saveAs(data.data, fileName);
  },
  async getOrderDetail(id: string) {
    const { data } = await Repository.get('/v2', {
      params: {
        dispatch: 'orders.details',
        order_id: id,
      },
    });

    return {
      order: formatOrderDetail(data.orderInfo),
      viewTools: formatViewTools(data.viewTools),
    };
  },
  async updateStatus(id: string, params: UpdateStatusParams) {
    const formData = new FormData();
    formData.append('is_ajax', '1');

    const { data } = await Repository.post('/', formData, {
      params: {
        dispatch: 'orders.update_status',
        id,
        status: params.status,
        notify_department: params.notifyDepartment,
        notify_vendor: params.notifyVendor,
        notify_customer: params.notifyCustomer,
      },
    });

    return handleAjaxNotification(data);
  },
  async updateDetails(id: string, params: UpdateOrderDetailsParams) {
    const formData = new FormData();
    formData.append('is_ajax', '1');
    formData.append('dispatch[orders.update_details]', '');
    formData.append('order_id', id);

    const mapping: { [key: string]: string } = {
      customerNotes: 'update_order[notes]',
      staffNotes: 'update_order[details]',
      notifyDepartment: '__notify_department',
      notifyVendor: '__notify_vendor',
      notifyCustomer: '__notify_user',
    };

    for (let key in params) {
      formData.append(mapping[key], params[key]);
    }

    const { data } = await Repository.post('/', formData);

    return handleAjaxNotification(data);
  },

  async exportOrders(page: number, ids: string[]) {
    const formData = new URLSearchParams();
    formData.append('page', page.toString());
    formData.append('is_ajax', '1');
    formData.append('dispatch[orders.export_range]', '');
    formData.append('redirect_url', 'vendor.php?dispatch=orders.manage');

    for (let id of ids) {
      formData.append('order_ids[]', id);
    }
    await Repository.post('/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
};
