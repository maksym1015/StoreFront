import { Table, Tooltip } from 'antd';
import AppPagination from 'components/app/AppPagination';
import OrderStatus from 'components/app/OrderStatus';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { OrdersResponse } from 'types';
import { ColumnsType } from 'antd/es/table';
import { Order } from 'types';
import { useDataTable } from 'hooks/data-table';
import { Text } from 'rebass';
import { InfoCircleFilled } from '@ant-design/icons';
import { Currency } from 'components/app/Currency';
import { useRouter } from 'next/router';

const OrderRepository = RepositoryFactory.get('order');

const baseColumns: ColumnsType<Order> = [
  {
    title: 'Order ID',
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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
  },
  {
    title: 'Place by',
    dataIndex: ['customer', 'outlet'],
    key: 'customer',
    sorter: true,
  },
  {
    title: 'Phone',
    dataIndex: ['customer', 'phone'],
    key: 'phone',
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

interface Props {
  loading: boolean;
  ordersData?: OrdersResponse;
}

const OrdersTable: React.FC<Props> = ({ ordersData, loading }) => {
  const { onchange, rowSelection, selectedRowKeys, columns, onRow } = useDataTable(baseColumns);
  const router = useRouter();

  const onClickBulk = async (key: string) => {
    if (key === 'print') {
      const form = document.getElementById('orders_hidden_form') as HTMLFormElement;
      if (form) {
        form.submit();
      }
    }

    if (key === 'printPDF') {
      await OrderRepository.downloadPdf(selectedRowKeys as string[]);
    }

    if (key === 'export') {
      const page = parseInt(router.query.currentPage as string) || 1;
      await OrderRepository.exportOrders(page, selectedRowKeys as string[]);
      router.replace({
        pathname: '/data-export',
        query: {
          type: 'orders',
          currentPage: page,
        },
      });
    }
  };

  const menu = [
    {
      label: 'Invoice bulk print (PDF)',
      value: 'printPDF',
    },
    {
      label: 'Invoice bulk print',
      value: 'print',
    },
    {
      label: 'Export selected',
      value: 'export',
    },
  ];

  return (
    <>
      <form
        style={{ display: 'none' }}
        method="POST"
        target="_blank"
        action="/api"
        id="orders_hidden_form"
      >
        <input type="text" name="dispatch[orders.bulk_print]" value="1" readOnly />
        {selectedRowKeys.map((id) => {
          return <input key={id} type="text" name="order_ids[]" value={id} readOnly />;
        })}
      </form>
      <AppPagination
        storageKey="orders"
        type="Orders"
        totalItems={ordersData?.search.totalItems}
        qtySelected={selectedRowKeys.length}
        menu={menu}
        onClickBulk={onClickBulk}
      ></AppPagination>
      <Table<Order>
        className="clickable-row"
        onChange={onchange}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={ordersData?.orders}
        pagination={false}
        rowKey="id"
        loading={loading}
        showSorterTooltip={false}
        onRow={onRow}
        summary={() => {
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={columns.length - 1}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text sx={{ pt: 3 }} textAlign="right" variant="heading">
                    Total (ex VAT):
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text sx={{ pt: 3 }} fontSize="14px">
                    <Currency value={ordersData?.total}></Currency>
                    <Tooltip title="Total of all orders on the page">
                      <InfoCircleFilled
                        style={{ color: '#FE5568', marginLeft: 5 }}
                      ></InfoCircleFilled>
                    </Tooltip>
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={columns.length - 1}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text textAlign="right" variant="heading">
                    Complete orders (ex VAT):
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text fontSize="14px">
                    <Currency value={ordersData?.totalCompleted}></Currency>
                    <Tooltip title="Total of all orders that are the “Complete” status">
                      <InfoCircleFilled
                        style={{ color: '#FE5568', marginLeft: 5 }}
                      ></InfoCircleFilled>
                    </Tooltip>
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
};

export default OrdersTable;
