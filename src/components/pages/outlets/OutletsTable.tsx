import { Table } from 'antd';
import AppPagination from 'components/app/AppPagination';
import { ColumnsType } from 'antd/es/table';
import { User, Search } from 'types';
import { useDataTable } from 'hooks/data-table';

const baseColumns: ColumnsType<User> = [
  {
    title: 'Outlet',
    dataIndex: 'outletName',
    key: 'outlet_name',
    sorter: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: true,
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    sorter: true,
  },
  {
    title: 'County',
    dataIndex: 'county',
    key: 'county',
    sorter: true,
  },
  {
    title: 'Postcode',
    dataIndex: 'zipCode',
    key: 'zip_code',
    sorter: true,
  },
  {
    title: 'Outlet Style',
    dataIndex: 'outletStyle',
    key: 'outlet_style',
    sorter: true,
  },
];

interface Props {
  loading: boolean;
  data?: {
    users: User[];
    search: Search;
  };
}

export const OutletsTable: React.FC<Props> = ({ data, loading }) => {
  const { columns, rowSelection, selectedRowKeys, onchange } = useDataTable(baseColumns);

  const onClickBulk = async () => {};
  const menu = [
    {
      label: 'Delete Selected',
      value: 'delete',
    },
  ];

  return (
    <>
      <AppPagination
        storageKey="outlets"
        type="Outlets"
        totalItems={data?.search.totalItems}
        menu={menu}
        qtySelected={selectedRowKeys.length}
        onClickBulk={onClickBulk}
      ></AppPagination>
      <Table<User>
        onChange={onchange}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.users}
        pagination={false}
        rowKey="id"
        loading={loading}
        showSorterTooltip={false}
      />
    </>
  );
};
