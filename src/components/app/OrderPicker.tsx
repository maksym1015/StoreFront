import { Modal, Table, Form, Divider, Button, Space, Input, Row, Col, Pagination } from 'antd';
import { Box } from 'rebass';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { useEffect, useState, useRef } from 'react';
import { OrdersResponse, Order, SelectedItem } from 'types';
import { ColumnsType } from 'antd/es/table';
import { useDataTable } from 'hooks/data-table';
import { useDebouncedCallback } from 'use-debounce';
import { FormInstance } from 'antd/lib/form';
import uniqBy from 'lodash.uniqby';
import OrderStatus from 'components/app/OrderStatus';
import { Currency } from 'components/app/Currency';

const OrderRepository = RepositoryFactory.get('order');

interface Props {
  visible?: boolean;
  onCancel?: () => void;
  onChange: (items: SelectedItem[]) => void;
  selectedOrders: SelectedItem[];
}

const baseColumns: ColumnsType<Order> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'order_id',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (status: string) => {
      return <OrderStatus status={status}></OrderStatus>;
    },
  },
  {
    title: 'Place by',
    dataIndex: ['customer', 'fullName'],
    key: 'customer',
    sorter: true,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
  },
  {
    title: 'Total (ex VAT)',
    dataIndex: 'subtotal',
    key: 'total',
    sorter: true,
    render: (value) => {
      return <Currency value={value} />;
    },
  },
];

export const OrderPicker: React.FC<Props> = ({ visible, onCancel, onChange, selectedOrders }) => {
  const [orderData, setOrderData] = useState<OrdersResponse>();
  const formInstance = useRef<FormInstance>(null);
  const [formValues, setFormValues] = useState<any>({});
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { columns, rowSelection, selectedRowKeys, sortConfig, onchange } = useDataTable(
    baseColumns,
    false,
  );
  const [onFormchange] = useDebouncedCallback(async () => {
    if (formInstance.current) {
      const values = await formInstance.current.validateFields();
      setFormValues(values);
    }
  }, 400);

  useEffect(() => {
    const fetData = async () => {
      setLoading(true);
      try {
        const data = await OrderRepository.get({
          currentPage: page,
          perPage,
          ...sortConfig,
          ...formValues,
        });
        setOrderData(data);
      } catch (e) {}
      setLoading(false);
    };
    fetData();
  }, [formValues, sortConfig, page, perPage]);

  const onPerPageChange = (...args: any) => {
    setPage(1);
    setPerpage(args[1]);
  };

  const clearSearch = () => {
    formInstance.current?.resetFields();
    onFormchange();
  };

  const addOrders = (close?: boolean) => {
    const orders =
      orderData?.orders
        .filter((order) => selectedRowKeys.includes(order.id))
        .map((order) => ({ id: order.id, label: `Order #${order.id}` })) || [];

    onChange(uniqBy([...orders, ...selectedOrders], (o) => o.id));

    if (close && onCancel) {
      onCancel();
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel} title="Add Orders" footer={null}>
      <Box sx={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto', overflowX: 'hidden', p: 1 }}>
        <Form
          layout="vertical"
          ref={formInstance}
          initialValues={{ category: '', status: '' }}
          onValuesChange={onFormchange}
        >
          <Row gutter={25}>
            <Col xs={12}>
              <Form.Item label="Customer" name="customer">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label="Email" name="email">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Row gutter={15}>
                <Col span={12}>
                  <Form.Item label="Total from (£)" name="totalFrom">
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="totalTo" label="Total to (£)">
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Box sx={{ textAlign: 'right' }}>
            <Button type="default" onClick={clearSearch}>
              Clear
            </Button>
          </Box>
        </Form>
        <Divider></Divider>
        <Box sx={{ mb: 3 }}>
          <Pagination
            showSizeChanger
            current={page}
            total={orderData?.search.totalItems}
            onChange={setPage}
            onShowSizeChange={onPerPageChange}
          ></Pagination>
        </Box>
        <Table<Order>
          onChange={onchange}
          size="middle"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={orderData?.orders}
          pagination={false}
          rowKey="id"
          loading={loading}
          showSorterTooltip={false}
        />
      </Box>
      <Divider></Divider>
      <Box sx={{ justifyContent: 'flex-end', display: 'flex', mt: 4 }}>
        <Space size={10}>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              addOrders(true);
            }}
          >
            Add orders and close
          </Button>
          <Button
            type="primary"
            onClick={() => {
              addOrders();
            }}
          >
            Add orders
          </Button>
        </Space>
      </Box>
    </Modal>
  );
};
