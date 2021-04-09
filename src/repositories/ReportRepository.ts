import Repository from './Repository';
import { formatReportData } from 'utils/format-data';
import sortBy from 'lodash.sortby';

export default {
  async getSubReports(id: string) {
    const { data } = await Repository.get('/', {
      params: {
        dispatch: 'sales_reports.view',
        report_id: id,
      },
    });

    const rs = Object.values(data.report.tables).map((o: any) => ({
      name: o.description,
      id: o.tableId,
      type: o.type,
      position: o.position,
    }));

    return sortBy(rs, (o) => parseInt(o.position));
  },

  async get(id: string, type: string, params: any) {
    if (params) {
      const formData = new FormData();
      formData.append('is_search', 'Y');
      formData.append('report_id', id);
      formData.append('selected_section', `table_${type}`);
      formData.append('time_from', params.startDate);
      formData.append('time_to', params.endDate);
      formData.append('period', 'C');
      formData.append('is_ajax', '1');
      formData.append('dispatch[sales_reports.set_report_view]', 'Search');
      await Repository.post('/', formData);
    }

    const { data } = await Repository.get('/', {
      params: {
        dispatch: 'sales_reports.view',
        report_id: id,
        table_id: type,
        result_ids: `content_table_${type}`,
        is_ajax: '1',
      },
    });

    return formatReportData(JSON.parse(data.html[`contentTable${type}`]));
  },
};
