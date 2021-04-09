import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { Product } from 'types';
import { Currency } from 'components/app/Currency';
import { Text, Image, Box } from 'rebass';

interface Props {
  items: Product[];
}

const columns: ColumnsType<Product> = [
  {
    title: 'Item',
    dataIndex: 'image',
    key: 'image',
    render: (image: string, product) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src={image} sx={{ width: 95, height: 98, flexShrink: 0 }}></Image>
          <Box sx={{ ml: 3 }}>
            <a>{product.name}</a>
            {product.code && (
              <Text sx={{ color: 'midGrey', fontSize: 10, fontWeight: 500, mt: 2 }}>
                Code: {product.code}
              </Text>
            )}
          </Box>
        </Box>
      );
    },
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    key: 'qty',
    render: (value: number) => {
      return <Text sx={{ fontWeight: 600, fontSize: 16 }}>{value}</Text>;
    },
  },
  {
    title: 'Unit Price',
    dataIndex: 'displayPrice',
    key: 'displayPrice',
    render: (value: number) => {
      return (
        <Text sx={{ fontWeight: 600, fontSize: 16 }}>
          <Currency value={value}></Currency>
        </Text>
      );
    },
  },
  {
    title: 'Total (Ex VAT)',
    dataIndex: 'displayPrice',
    key: 'subTotal',
    render: (price: number, product) => {
      return (
        <Text sx={{ fontWeight: 600, fontSize: 16 }}>
          <Currency value={price * (product.qty || 0)}></Currency>
        </Text>
      );
    },
  },
];

export const OrderItemsTable: React.FC<Props> = ({ items }) => {
  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={false}
      rowKey="id"
      className="order-items-table"
    />
  );
};
