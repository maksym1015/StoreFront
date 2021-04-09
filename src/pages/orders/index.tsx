import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { SimpleSearch } from 'components/app/SimpleSearch';
import OrdersTable from 'components/pages/orders/OrdersTable';
import { Box, Text } from 'rebass';
import { Row, Input, Space, Form } from 'antd';
import { useTableData } from 'hooks/fetch-table-data';
import { AdvancedSearch } from 'components/app/AdvancedSearch';
import { OrdersSearchForm } from 'components/pages/orders/OrdersSearchForm';
import MagnifierIcon from 'assets/icons/magnifier.svg';

const OrderRepository = RepositoryFactory.get('order');

const Index: React.FC = () => {
  const { loading, data } = useTableData(OrderRepository.get, 'orders');

  return (
    <Box>
      <Row justify="space-between">
        <Text variant="pageHeading">Orders</Text>
        <span></span>
      </Row>
      <SimpleSearch>
        <Form.Item name="outlet" label="&nbsp;">
          <Input
            style={{ width: 200, height: 40 }}
            placeholder="Outlet"
            prefix={<MagnifierIcon style={{ marginRight: 10 }} />}
          />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input style={{ width: 200 }} placeholder="Email" />
        </Form.Item>
        <Space size={7}>
          <Form.Item name="totalFrom" label="Total From">
            <Input placeholder="Total (£) " type="number" style={{ width: 120 }} />
          </Form.Item>
          <span>-</span>
          <Form.Item name="totalTo" label="Total To">
            <Input placeholder="Total (£) " type="number" style={{ width: 120 }} />
          </Form.Item>
        </Space>
      </SimpleSearch>
      <AdvancedSearch
        type="Orders"
        repository={OrderRepository}
        savedSearches={data?.savedSearches}
      >
        <OrdersSearchForm></OrdersSearchForm>
      </AdvancedSearch>
      <Box variant="card">
        <OrdersTable ordersData={data} loading={loading} />
      </Box>
    </Box>
  );
};

export default Index;
