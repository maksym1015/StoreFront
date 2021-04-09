import Repository from './Repository';
import { DataExportConfig, Layout } from 'types';
import handleAjaxNotification from 'utils/handle-ajax-notification';
import Url from 'url-parse';

export default {
  async getLayout(type: string, parentId: string, page: string): Promise<DataExportConfig> {
    const { data } = await Repository.get('/v2', {
      params: {
        dispatch: 'exim.export',
        page,
        section: type,
        pattern_id: parentId,
      },
    });

    data.exportsFields = data.exportsFields.map((field: any) => ({
      key: field.key,
      title: field.label,
      required: Boolean(field.required),
      disabled: Boolean(field.required),
    }));
    return data;
  },

  async setActiveLayout(type: string, parentId: string, layoutId: string) {
    const formData = new FormData();
    formData.append('section', type);
    formData.append('layout_data[pattern_id]', parentId);
    formData.append('layout_data[layout_id]', layoutId);
    formData.append('dispatch[exim.set_layout]', '');
    formData.append('is_ajax', '1');

    await Repository.post('/', formData);
  },

  async deleteLayout(type: string, parentId: string, layoutId: string) {
    const formData = new FormData();
    formData.append('section', type);
    formData.append('layout_data[pattern_id]', parentId);
    formData.append('layout_data[layout_id]', layoutId);
    formData.append('dispatch[exim.delete_layout]', 'Delete');
    formData.append('is_ajax', '1');

    await Repository.post('/', formData);
  },

  async saveLayoutAs(type: string, parentId: string, layout: Layout) {
    const formData = new FormData();
    formData.append('section', type);
    formData.append('layout_data[pattern_id]', parentId);
    formData.append('layout_data[layout_id]', '');
    formData.append('layout_data[name]', layout.name);
    formData.append('dispatch[exim.store_layout.save_as]', 'Save');
    formData.append('is_ajax', '1');
    formData.append('export_options[delimiter]', layout.options.delimiter);
    formData.append('export_options[output]', layout.options.output);
    formData.append('export_options[filename]', layout.options.filename);

    for (let col of layout.cols) {
      formData.append('layout_data[cols][]', col);
    }

    await Repository.post('/', formData);
  },

  async saveLayout(type: string, parentId: string, layout: Layout) {
    const formData = new FormData();
    formData.append('section', type);
    formData.append('layout_data[pattern_id]', parentId);
    formData.append('layout_data[layout_id]', layout.layoutId);
    formData.append('layout_data[name]', layout.name);
    formData.append('dispatch[exim.store_layout]', 'Save layout');
    formData.append('is_ajax', '1');
    formData.append('export_options[delimiter]', layout.options.delimiter);
    formData.append('export_options[output]', layout.options.output);
    formData.append('export_options[filename]', layout.options.filename);

    for (let col of layout.cols) {
      formData.append('layout_data[cols][]', col);
    }

    await Repository.post('/', formData);
  },

  async export(type: string, parentId: string, layout: Layout) {
    const formData = new FormData();
    formData.append('section', type);
    formData.append('layout_data[pattern_id]', parentId);
    formData.append('layout_data[layout_id]', layout.layoutId || '');
    formData.append('layout_data[name]', layout.name || '');
    formData.append('dispatch[exim.export]', '');
    formData.append('is_ajax', '1');
    formData.append('export_options[delimiter]', layout.options.delimiter);
    formData.append('export_options[output]', layout.options.output);
    formData.append('export_options[filename]', layout.options.filename);

    for (let col of layout.cols) {
      formData.append('layout_data[cols][]', col);
    }

    const { data } = await Repository.post('/', formData);
    const url = new Url(data.forceRedirection, true);

    if (layout.options.output === 'D') {
      const a = document.createElement('a');
      a.href = `/api/?dispatch=${url.query.dispatch}&filename=${url.query.filename}`;
      a.click();
    } else {
      window.open(
        `/api/?dispatch=${url.query.dispatch}&filename=${url.query.filename}&to_screen=Y`,
      );
    }

    return handleAjaxNotification(data);
  },
};
