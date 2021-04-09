import { Box, Text } from 'rebass';
import { Form, Input, Row, Col, Divider, DatePicker, Checkbox, Select, Button, Space } from 'antd';
import { useAdvancedForm } from 'hooks/advanced-search-form';
import { ProductPicker } from 'components/app/ProductPicker';
import { useEffect, useState } from 'react';
import { SavedSearch, SelectedItem } from 'types';
import { ManageSelectedItems } from 'components/app/ManageSelectedItems';
import { DATE_RANGES } from 'utils/constant';
import { Store } from 'antd/lib/form/interface';

export const OrdersSearchForm: React.FC = () => {
  const [productData] = useState<{ savedSearches: SavedSearch[] }>({
    savedSearches: [],
  });
  const {
    formInstance,
    isOpenPicker,
    setOpenPicker,
    isOpenSelectedItems,
    setOpenSelectedItems,
  } = useAdvancedForm();

  const [selectedProducts, setSelectedProducts] = useState<SelectedItem[]>([]);

  useEffect(() => {
    formInstance.current?.setFieldsValue({
      orderedProducts: selectedProducts.map((o) => o.id).join(','),
    });
  }, [selectedProducts]);

  const onValuesChange = (changeValues: Store, values: Store) => {
    if (changeValues.timeFrom || changeValues.timeTo) {
      formInstance?.current?.setFieldsValue({ period: 'C' });
    }

    if (!values.timeFrom && !values.timeTo && values.period === 'C') {
      formInstance?.current?.setFieldsValue({ period: 'A' });
    }

    if (changeValues.period) {
      formInstance?.current?.setFieldsValue({ timeFrom: null, timeTo: null });
    }
  };

  return (
    <Box>
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ category: '', period: 'A' }}
        ref={formInstance}
        onValuesChange={onValuesChange}
      >
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item label="Outlet" name="outlet">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="User" name="customer">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ marginTop: 0 }}></Divider>
        <Row align="middle">
          <Space size={25}>
            <Form.Item label="Order Date" name="period">
              <Select style={{ width: '180px' }}>
                {DATE_RANGES.map((item, i) => {
                  if (Array.isArray(item)) {
                    return (
                      <Select.OptGroup key={i} label="---------------------">
                        {item.map((sub) => {
                          return (
                            <Select.Option value={sub.value} key={sub.value}>
                              {sub.label}
                            </Select.Option>
                          );
                        })}
                      </Select.OptGroup>
                    );
                  }

                  return (
                    <Select.Option value={item.value} key={i}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Space>
              <Form.Item name="timeFrom" label="&nbsp;">
                <DatePicker placeholder="From" />
              </Form.Item>
              <Form.Item name="timeTo" label="&nbsp;">
                <DatePicker placeholder="To" />
              </Form.Item>
            </Space>
          </Space>
        </Row>
        <Row gutter={25}>
          <Col xs={8}>
            <Form.Item label="Order Id" name="orderId">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={16}>
            <Form.Item label="Order Total">
              <Row gutter={18}>
                <Col span={12}>
                  <Form.Item name="totalFrom">
                    <Input placeholder="Total from (£)" type="number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="totalTo">
                    <Input placeholder="Total to (£)" type="number" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Order Status" name="statuses">
          <Checkbox.Group>
            <Row gutter={18}>
              <Col>
                <Checkbox value="P">Payment Processed</Checkbox>
              </Col>
              <Col>
                <Checkbox value="C">Complete</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Divider></Divider>
        <Form.Item label="Ordered Products">
          <Row align="middle" gutter={[25, 17]}>
            <Col xs={10}>
              <Text
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setOpenSelectedItems(true);
                }}
              >
                <Text color="primary" sx={{ display: 'inline-block', mr: 2 }}>
                  {selectedProducts.length}
                </Text>
                items selected
              </Text>
              <ManageSelectedItems
                visible={isOpenSelectedItems}
                onChange={setSelectedProducts}
                onCancel={() => {
                  setOpenSelectedItems(false);
                }}
                items={selectedProducts}
              ></ManageSelectedItems>
            </Col>
            <Col xs={14}>
              <Button
                type="default"
                onClick={() => {
                  setOpenPicker(true);
                }}
              >
                <Text color="primary">Add</Text>
              </Button>
              <ProductPicker
                selectedProducts={selectedProducts}
                onChange={setSelectedProducts}
                visible={isOpenPicker}
                onCancel={() => {
                  setOpenPicker(false);
                }}
              ></ProductPicker>
            </Col>
            <Col xs={10}>or any item from the saved search </Col>
            <Col xs={14}>
              <Form.Item name="productSavedSearch" style={{ margin: 0, maxWidth: '200px' }}>
                <Select allowClear={true}>
                  {productData.savedSearches.map((item) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={{ display: 'none' }} hidden name="orderedProducts">
          <Input></Input>
        </Form.Item>
      </Form>
    </Box>
  );
};
