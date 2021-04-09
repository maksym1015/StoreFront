import { Select } from 'antd';
import { Table, Input } from 'antd';
import AppPagination from 'components/app/AppPagination';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import reloadPage from 'helpers/reload-page';
import { ProductsResponse } from 'types';
import { ColumnsType } from 'antd/es/table';
import { Product } from 'types';
import { Currency } from 'components/app/Currency';
import { useDataTable } from 'hooks/data-table';
import { Text, Box } from 'rebass';
import { useState } from 'react';
import { useEvent } from 'hooks/event';
import { formatPrice } from 'filters/currency';
import Link from 'next/link';

const ProductRepository = RepositoryFactory.get('product');

const { Option } = Select;

interface UpdatedProducts {
  [key: string]: {
    name: string;
    inputPrice: number;
    logisticFee: number;
  };
}

interface Props {
  productsData?: ProductsResponse;
  loading: boolean;
}

const ProductsTable: React.FC<Props> = ({ productsData, loading }) => {
  const [updatedProducts, setUpdatedProducts] = useState<UpdatedProducts>({});

  const save = useEvent(
    'SAVE_PRICING',
    async () => {
      await ProductRepository.updateProducts();
      setUpdatedProducts({});
      reloadPage();
    },
    [updatedProducts],
  );

  const updatePrice = (type: 'inputPrice' | 'logisticFee', product: Product, value: number) => {
    // Product name is required field for any update
    updatedProducts[product.id] = updatedProducts[product.id] || {
      name: product.name,
      inputPrice: product.inputPrice,
      logisticFee: product.logisticFee,
    };
    updatedProducts[product.id][type] = value;
    setUpdatedProducts({ ...updatedProducts });
  };

  const baseColumns: ColumnsType<Product> = [
    {
      title: 'Name / code',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (name: string, product) => {
        return (
          <Box>
            <Link href={`/products/${product.id}`}>
              <a>{name}</a>
            </Link>
            <Text>{product.code}</Text>
          </Box>
        );
      },
    },
    {
      title: 'Input Price (£)',
      dataIndex: 'inputPrice',
      key: 'amount',
      render: (value: number, product) => {
        return (
          <Input
            style={{ width: 90 }}
            onPressEnter={save}
            onChange={(e) => {
              updatePrice('inputPrice', product, parseFloat(e.target.value) || 0);
            }}
            defaultValue={value.toFixed(2)}
          ></Input>
        );
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
      render: (value: number, product) => {
        return (
          <Input
            style={{ width: 90 }}
            onPressEnter={save}
            onChange={(e) => {
              updatePrice('logisticFee', product, parseFloat(e.target.value) || 0);
            }}
            defaultValue={value.toFixed(2)}
          ></Input>
        );
      },
    },
    {
      title: 'Sell out price',
      dataIndex: 'price',
      key: 'price',
      render: (value: number, product: Product) => {
        const updatedValue = updatedProducts[product.id]
          ? formatPrice(
              updatedProducts[product.id].inputPrice * 1.03 +
                updatedProducts[product.id].logisticFee,
            )
          : value;
        return <Currency value={updatedValue}></Currency>;
      },
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedPricingTimestamp',
      key: 'updated_pricing',
      sorter: true,
    },
    {
      title: 'VAT',
      dataIndex: 'hasVat',
      key: 'vat',
      sorter: true,
      render: (hasVat: boolean) => {
        return <span>{hasVat ? 'Y' : 'N'}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      key: 'status',
      render: (status: string, product: Product) => {
        const onChange = (value: string) => {
          ProductRepository.updateStatus(product.id, value as any);
        };
        return (
          <Select
            defaultValue={status}
            style={{ width: 130 }}
            bordered={false}
            onChange={onChange}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Option value="A">Active</Option>
            <Option value="D">Disabled</Option>
          </Select>
        );
      },
    },
  ];

  const { columns, selectedRowKeys, rowSelection, onchange } = useDataTable(baseColumns);

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
        storageKey="pricing"
        type="Products"
        totalItems={productsData?.search?.totalItems}
        menu={menu}
        qtySelected={selectedRowKeys.length}
        onClickBulk={onClickBulk}
      ></AppPagination>
      <Table<Product>
        onChange={onchange}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={productsData?.products}
        pagination={false}
        rowKey="id"
        loading={loading}
        showSorterTooltip={false}
      />
    </>
  );
};

export default ProductsTable;
