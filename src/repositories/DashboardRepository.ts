import Repository from './Repository';
import {
  formatProducts,
  formatTopSkus,
  getGeneralStats,
  formatOrders,
  formatGraphData,
} from 'utils/format-data';

export default {
  async get() {
    const data = (
      await Repository.get('/v2', {
        params: {
          object: 'dashboard',
          time_period: 'M',
        },
      })
    ).data;
    return {
      updatedProducts: formatProducts(data.updatedProducts).slice(0, 10),
      topSellingSkus: formatTopSkus(data.topSellingSkus),
      generalStats: getGeneralStats(data),
      recentOrders: formatOrders(data.recentOrders),
      graph: formatGraphData(data.graphs),
    };
  },
};
