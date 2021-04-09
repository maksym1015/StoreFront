import {
  Modal,
  Table,
  Form,
  Divider,
  Button,
  Space,
  Input,
  Select,
  Row,
  Col,
  Pagination,
} from 'antd';
import { Box } from 'rebass';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { useEffect, useState, useRef } from 'react';
import { SelectedItem } from 'types';
import { CategoryTree } from 'components/app/CategoryTree';
import { ColumnsType } from 'antd/es/table';
import { useDataTable } from 'hooks/data-table';
import { useDebouncedCallback } from 'use-debounce';
import { FormInstance } from 'antd/lib/form';
import uniqBy from 'lodash.uniqby';
import { DslProduct } from 'graphql/generated/graphql';
import { usePageData } from 'hooks/fetch-page-data';

const ProductRepository = RepositoryFactory.get('product');

const { Option } = Select;

interface Props {
  visible?: boolean;
  onCancel?: () => void;
  onChange: (items: SelectedItem[]) => void;
  selectedProducts: SelectedItem[];
}

const baseColumns: ColumnsType<DslProduct> = [
  {
    title: 'Product name',
    dataIndex: 'name',
    key: 'product',
    sorter: true,
  },
];

export const ProductPicker: React.FC<Props> = ({
  visible,
  onCancel,
  onChange,
  selectedProducts,
}) => {
  const [products, setProducts] = useState<DslProduct[]>();
  const [totalItems, setTotalItems] = useState(0);
  const formInstance = useRef<FormInstance>(null);
  const [formValues, setFormValues] = useState<any>({});
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { columns, rowSelection, selectedRowKeys, sortConfig, onchange } = useDataTable(
    baseColumns,
    false,
  );

  const { data: categories } = usePageData(() => RepositoryFactory.get('category').get());

  const [onFormchange] = useDebouncedCallback(async () => {
    if (formInstance.current) {
      const values = await formInstance.current.validateFields();
      setFormValues(values);
    }
  }, 400);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await ProductRepository.get({
          currentPage: page,
          perPage,
          ...sortConfig,
          ...formValues,
        });
        setProducts(data?.products);
        setTotalItems(data?.total || 0);
      } catch (e) {}
      setLoading(false);
    };
    fetchProductData();
  }, [formValues, sortConfig, page, perPage]);

  const onPerPageChange = (...args: any) => {
    setPage(1);
    setPerpage(args[1]);
  };

  const clearSearch = () => {
    formInstance.current?.resetFields();
    onFormchange();
  };

  const addProducts = (close?: boolean) => {
    const x =
      (products || [])
        .filter((product) => selectedRowKeys.includes(product.id))
        .map((product) => ({ id: product.id, label: product.name })) || [];
    onChange(uniqBy([...x, ...selectedProducts], (o) => o.id));

    if (close && onCancel) {
      onCancel();
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel} title="Add Products" footer={null}>
      <Box sx={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto', overflowX: 'hidden', p: 1 }}>
        <Form
          layout="vertical"
          ref={formInstance}
          initialValues={{ category: '', status: '' }}
          onValuesChange={onFormchange}
        >
          <Row gutter={25}>
            <Col xs={12}>
              <Form.Item label="Search results with" name="searchText">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Row gutter={15}>
                <Col span={12}>
                  <Form.Item label="Price from (£)" name="priceFrom">
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="priceTo" label="Price to (£)">
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Form.Item label="Status" name="status">
                <Select>
                  <Option value="">Status</Option>
                  <Option value="A">Active</Option>
                  <Option value="D">Disabled</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <CategoryTree data={categories || []} label="Category"></CategoryTree>
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
            total={totalItems}
            onChange={setPage}
            onShowSizeChange={onPerPageChange}
          ></Pagination>
        </Box>
        <Table<DslProduct>
          onChange={onchange}
          size="middle"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={products}
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
              addProducts(true);
            }}
          >
            Add products and close
          </Button>
          <Button
            type="primary"
            onClick={() => {
              addProducts();
            }}
          >
            Add products
          </Button>
        </Space>
      </Box>
    </Modal>
  );
};
