import { Select } from 'antd';
import { Table } from 'antd';
import { Menu } from 'antd';
import AppPagination from 'components/app/AppPagination';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import reloadPage from 'helpers/reload-page';
import { ColumnsType } from 'antd/es/table';
import { ShowOnHoverImage } from 'components/app/ShowOnHoverImage';
import { useDataTable } from 'hooks/data-table';
import { SettingDropdown } from 'components/app/SettingDropdown';
import { Currency } from 'components/app/Currency';
import { DslProduct, Status } from 'graphql/generated/graphql';

const ProductRepository = RepositoryFactory.get('product');

const { Option } = Select;

const baseColumns: ColumnsType<DslProduct> = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    sorter: true,
  },
  {
    title: 'Image',
    dataIndex: ['mainImage', 'thumbnailPath'],
    key: 'image',
    render: (image: string) => {
      return <ShowOnHoverImage src={image} />;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'product',
    sorter: true,
    render: (description: string) => {
      return <a>{description}</a>;
    },
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'Unit',
    sorter: true,
    render: () => {
      return <span>Each</span>;
    },
  },
  {
    title: 'Input Price',
    dataIndex: ['price', 'subtotal'],
    key: 'price',
    sorter: true,
    render: (price: number) => {
      return <Currency value={price}></Currency>;
    },
  },
  {
    title: 'Sell Out Price',
    dataIndex: ['price', 'subtotal'],
    key: 'price',
    sorter: true,
    render: (price: number) => {
      return <Currency value={price}></Currency>;
    },
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'category',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
    key: 'status',
    render: (status: Status, product: DslProduct) => {
      const onChange = (value: number) => {
        ProductRepository.updateStatus(product.id, value);
      };
      return (
        <Select
          defaultValue={status.value}
          style={{ width: 130 }}
          bordered={false}
          onChange={onChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Option value={0}>Active</Option>
          <Option value={1}>Disabled</Option>
        </Select>
      );
    },
  },
  {
    title: '',
    dataIndex: '',
    key: 'action',
    render(value: string, product: DslProduct) {
      value;
      const deleteProduct = async () => {
        await ProductRepository.deleteProducts([product.id]);
        reloadPage();
      };

      const settingMenu = (
        <Menu>
          <Menu.Item onClick={deleteProduct}>Delete</Menu.Item>
        </Menu>
      );
      return <SettingDropdown overlay={settingMenu}></SettingDropdown>;
    },
  },
];

interface Props {
  loading: boolean;
  products: DslProduct[];
  totalItems: number;
}

const ProductsTable: React.FC<Props> = ({ products, loading, totalItems }) => {
  const { columns, selectedRowKeys, rowSelection, onchange, onRow } = useDataTable(baseColumns);

  const onClickBulk = async (key: string) => {
    if (key === 'delete') {
      await ProductRepository.deleteProducts(selectedRowKeys as string[]);
    }

    if (key === 'clone') {
      await ProductRepository.cloneProducts(selectedRowKeys as string[]);
    }

    reloadPage();
  };

  const menu = [
    {
      label: 'Delete Selected',
      value: 'delete',
    },
    {
      label: 'Clone Seleteced',
      value: 'clone',
    },
    {
      label: 'Edit Seleteced',
      value: 'edit',
    },
  ];

  return (
    <>
      <AppPagination
        storageKey="products"
        type="Products"
        totalItems={totalItems}
        menu={menu}
        qtySelected={selectedRowKeys.length}
        onClickBulk={onClickBulk}
      ></AppPagination>
      <Table<DslProduct>
        className="clickable-row"
        onRow={onRow}
        onChange={onchange}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
        pagination={false}
        rowKey="id"
        loading={loading}
        showSorterTooltip={false}
      />
    </>
  );
};

export default ProductsTable;
