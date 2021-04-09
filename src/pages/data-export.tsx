import { Box, Text } from 'rebass';
import { Row, Form, Select, Transfer, Typography, Tooltip, Input, Tabs, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { usePageData } from 'hooks/fetch-page-data';
import { AppSpin } from 'components/app/Spin';
import { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import reloadPage from 'helpers/reload-page';
import { Layout } from 'types';
import moment from 'moment';
import { useRef } from 'react';
import { FormInstance } from 'antd/lib/form';

const { Title } = Typography;
const { TabPane } = Tabs;

const DataExportRepo = RepositoryFactory.get('dataExport');

export default function DataExport() {
  const router = useRouter();
  const formInstance = useRef<FormInstance>(null);
  const [activeLayout, setActiveLayout] = useState<Layout>();
  const exportType = router.query.type as string;
  const [exportKeys, setExportKeys] = useState<string[]>([]);
  const [selectedExportKeys, setSelectedExportKeys] = useState<string[]>([]);
  const parentId = (router.query.parentId || 'orders') as string;

  const { loading, data } = usePageData(() => {
    return DataExportRepo.getLayout(
      exportType,
      parentId,
      (router.query.currentPage || '1') as string,
    );
  }, ['type', '_fe_uid', 'parentId']);

  const initialValues = data
    ? {
        layout: activeLayout?.layoutId,
        delimiter: activeLayout?.options.delimiter || 'S',
        output: activeLayout?.options.output || 'D',
        filename:
          activeLayout?.options.filename ||
          `${data.pattern.patternId}_${moment().format('MM_DD_YYYY')}.csv`,
      }
    : undefined;

  useEffect(() => {
    if (data) {
      setSelectedExportKeys([]);
      const activeLayout = data.layouts.find((layout) => layout.active === 'Y');
      setActiveLayout(activeLayout);

      if (activeLayout) {
        setExportKeys(activeLayout.cols);
      } else {
        const requiredFields = data.exportsFields.filter((o) => o.required).map((o) => o.key);
        setExportKeys(requiredFields);
      }
    }
  }, [data]);

  const handleChange = (nextTargetKeys: string[]) => {
    setExportKeys(nextTargetKeys);
  };

  const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedExportKeys([...targetSelectedKeys, ...sourceSelectedKeys]);
  };

  const onChangelayout = async (value: string) => {
    await DataExportRepo.setActiveLayout(exportType, parentId, value);
    reloadPage();
  };

  const onChangeTab = (activeKey: string) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, parentId: activeKey },
    });
  };

  const deleteLayout = async () => {
    if (activeLayout) {
      await DataExportRepo.deleteLayout(exportType, parentId, activeLayout.layoutId);
      reloadPage();
    }
  };

  const clearFields = () => {
    if (data) {
      setExportKeys(data.exportsFields.filter((o) => o.required).map((o) => o.key));
    }
  };

  const saveLayoutAs = async () => {
    if (formInstance.current) {
      const values = formInstance.current.getFieldsValue();
      await DataExportRepo.saveLayoutAs(exportType, parentId, {
        name: values.layoutName || '',
        options: {
          delimiter: values.delimiter,
          output: values.output,
          filename: values.filename,
        },
        cols: exportKeys,
      } as Layout);
      reloadPage();
    }
  };

  const saveLayout = async () => {
    if (activeLayout && formInstance.current) {
      const values = formInstance.current.getFieldsValue();
      await DataExportRepo.saveLayout(exportType, parentId, {
        name: activeLayout.name,
        layoutId: activeLayout.layoutId,
        options: {
          delimiter: values.delimiter,
          output: values.output,
          filename: values.filename,
        },
        cols: exportKeys,
      } as Layout);
      reloadPage();
    }
  };

  const exportData = async () => {
    if (formInstance.current) {
      const values = formInstance.current.getFieldsValue();
      await DataExportRepo.export(exportType, parentId, {
        name: values.layoutName || '',
        layoutId: activeLayout?.layoutId || '',
        options: {
          delimiter: values.delimiter,
          output: values.output,
          filename: values.filename,
        },
        cols: exportKeys,
      } as Layout);
    }
  };

  return (
    <Box>
      {loading || !data ? (
        <AppSpin></AppSpin>
      ) : (
        <Box>
          <Row justify="space-between">
            <Text variant="pageHeading">
              {data.pattern.name} export{' '}
              <Button type="primary" onClick={exportData}>
                Export
              </Button>
            </Text>
          </Row>
          <Box variant="card">
            <Tabs onChange={onChangeTab} activeKey={parentId}>
              <TabPane tab="Orders" key="orders"></TabPane>
              <TabPane tab="Order Items" key="order_items"></TabPane>
            </Tabs>
            <Form
              layout="vertical"
              style={{ maxWidth: 900 }}
              initialValues={initialValues}
              ref={formInstance}
            >
              <Title level={4}>General</Title>
              <Form.Item label="layout" style={{ maxWidth: 300 }}>
                <Box sx={{ display: 'flex' }}>
                  <Form.Item name="layout" noStyle>
                    <Select onChange={onChangelayout}>
                      {data.layouts.map((layout) => {
                        return (
                          <Select.Option key={layout.layoutId} value={layout.layoutId}>
                            {layout.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  {activeLayout && (
                    <Button style={{ marginLeft: 10 }} onClick={deleteLayout}>
                      Delete
                    </Button>
                  )}
                </Box>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Transfer
                  dataSource={data.exportsFields}
                  targetKeys={exportKeys}
                  onChange={handleChange}
                  onSelectChange={handleSelectChange}
                  selectedKeys={selectedExportKeys}
                  titles={['Available fields', 'Exported fields']}
                  listStyle={{
                    width: 350,
                    height: 400,
                  }}
                  render={(item) => <span>{item.title}</span>}
                  style={{ marginBottom: 16 }}
                />
              </Form.Item>
              <Form.Item>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ mr: 4 }}>
                    <Space>
                      {activeLayout && <Button onClick={saveLayout}>Save layout</Button>}
                      <Button onClick={clearFields}>Clear fields</Button>
                    </Space>
                  </Box>
                  <Space>
                    <span>Save layout as</span>
                    <Form.Item name="layoutName" noStyle>
                      <Input style={{ width: 120 }}></Input>
                    </Form.Item>
                    <Button onClick={saveLayoutAs}>Save</Button>
                  </Space>
                </Box>
              </Form.Item>
              <Title level={4}>Export options</Title>
              <Form.Item label="CSV delimiter" style={{ maxWidth: 300 }} name="delimiter">
                <Select>
                  <Select.Option value="S">Semicolon</Select.Option>
                  <Select.Option value="C">Comma</Select.Option>
                  <Select.Option value="T">Tab</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <Tooltip
                    title={`Choose an action on the file: "Direct download" - to save the file on the local computer, "Screen" - to display the file's contents, "Server" - to save the file on the server file system.`}
                  >
                    <span>
                      Output <QuestionCircleOutlined />
                    </span>
                  </Tooltip>
                }
                style={{ maxWidth: 300 }}
                name="output"
              >
                <Select>
                  <Select.Option value="D">Direct Download</Select.Option>
                  <Select.Option value="C">Screen</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="File name" name="filename" style={{ maxWidth: 300 }}>
                <Input></Input>
              </Form.Item>
              <Form.Item>
                <Box sx={{ mb: 2 }}>
                  <Typography.Text type="warning">
                    {data.exportRange} {data.pattern.section} will be exported
                  </Typography.Text>
                </Box>
                <Button type="primary" onClick={exportData}>
                  Export
                </Button>
              </Form.Item>
            </Form>
          </Box>
        </Box>
      )}
    </Box>
  );
}
