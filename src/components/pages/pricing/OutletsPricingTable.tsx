import { Table } from 'antd';
import AppPagination from 'components/app/AppPagination';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import reloadPage from 'helpers/reload-page';
import { UserPricing, Search } from 'types';
import { ColumnsType } from 'antd/es/table';
import { useDataTable } from 'hooks/data-table';
import { Currency } from 'components/app/Currency';
import { EditOutlined } from '@ant-design/icons';
import { Box } from 'rebass';

const UserRepository = RepositoryFactory.get('user');

interface Props {
  data?: {
    items: UserPricing[];
    search: Search;
  };
  loading: boolean;
}

const baseColumns: ColumnsType<UserPricing> = [
  {
    title: 'Outlet',
    dataIndex: 'outletName',
    key: 'outlet',
    sorter: true,
  },
  {
    title: 'Code',
    dataIndex: ['product', 'code'],
    key: 'product_code',
    sorter: true,
  },
  {
    title: 'Product',
    dataIndex: ['product', 'name'],
    key: 'product',
    sorter: true,
  },
  {
    title: 'Input Price',
    dataIndex: 'inputPrice',
    key: 'price',
    sorter: true,
    render: (value: number) => {
      return <Currency value={value}></Currency>;
    },
  },
  {
    title: 'Fee %',
    dataIndex: 'fee',
    key: 'fee',
    render: () => {
      return <span>3%</span>;
    },
  },
  {
    title: 'Logistics',
    dataIndex: 'logisticFee',
    key: 'logisticFee',
    render: (value: number) => {
      return <Currency value={value}></Currency>;
    },
  },
  {
    title: 'Sell Out Price',
    dataIndex: 'sellOutPrice',
    key: 'price',
    sorter: true,
    render: (value: number) => {
      return <Currency value={value}></Currency>;
    },
  },
  {
    title: '',
    dataIndex: '',
    key: 'action',
    render: () => {
      return (
        <Box
          sx={{
            px: 2,
            py: 1,
            bg: '#F4F5F6',
            display: 'inline-block',
            color: '#9C9DA5',
            cursor: 'pointer',
            ':hover': { color: '#333' },
          }}
        >
          <EditOutlined></EditOutlined>
        </Box>
      );
    },
  },
];

export const OutletsPricingTable: React.FC<Props> = ({ data, loading }) => {
  const { columns, selectedRowKeys, rowSelection, onchange } = useDataTable(baseColumns);

  const onClickBulk = async (key: string) => {
    if (key === 'delete') {
      await UserRepository.deleteUserPricing(selectedRowKeys as string[]);
    }

    reloadPage();
  };

  const menu = [
    {
      label: 'Delete Selected',
      value: 'delete',
    },
  ];

  return (
    <>
      <AppPagination
        storageKey="outletsPricing"
        type="Products"
        totalItems={data?.search.totalItems}
        menu={menu}
        qtySelected={selectedRowKeys.length}
        onClickBulk={onClickBulk}
      ></AppPagination>
      <Table<UserPricing>
        onChange={onchange}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.items}
        pagination={false}
        rowKey="id"
        loading={loading}
        showSorterTooltip={false}
      />
    </>
  );
};
