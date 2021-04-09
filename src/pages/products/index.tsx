import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import { CategoryTree } from 'components/app/CategoryTree';
import { SimpleSearch } from 'components/app/SimpleSearch';
import ProductsTable from 'components/pages/products/ProductsTable';
import { useEvent } from 'hooks/event';
import { useTableData } from 'hooks/fetch-table-data';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Text } from 'rebass';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { OptionType } from 'types';
import { PRODUCT_STATUSES } from 'utils/constant';
import { usePageData } from 'hooks/fetch-page-data';

const { Option } = Select;
const ProductRepository = RepositoryFactory.get('product');
const statusOptions = [
  {
    label: 'Status',
    value: '',
  },
  ...PRODUCT_STATUSES,
];

export default function Index() {
  const router = useRouter();
  const save = useEvent('SAVE_PRICING');
  const isPricingPage = router.pathname.startsWith('/pricing');

  const { loading, data } = useTableData(ProductRepository.get, 'products', {
    isPricingMode: isPricingPage,
  });

  const { data: categories } = usePageData(() => RepositoryFactory.get('category').get());

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Box>
        <Box>
          {isPricingPage ? (
            <React.Fragment>
              <Text variant="pageHeading">
                Product Pricing{' '}
                <Button type="primary" onClick={save}>
                  Save
                </Button>
              </Text>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text variant="pageHeading">
                Products{' '}
                <Link href="/products/[id]" as="/products/new">
                  <Button type="primary">Add product</Button>
                </Link>
              </Text>
            </React.Fragment>
          )}
        </Box>
        <SimpleSearch initialValues={{ category: '', status: '' }}>
          <Form.Item name="searchText" label="&nbsp;">
            <Input style={{ width: 200 }} placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
          <Space size={7}>
            <Form.Item name="priceFrom" label="Price From">
              <Input placeholder="Price (£) " type="number" style={{ width: 120 }} />
            </Form.Item>
            <span>-</span>
            <Form.Item name="priceTo" label="Price To">
              <Input placeholder="Price (£) " type="number" style={{ width: 120 }} />
            </Form.Item>
          </Space>
          <Form.Item name="status" label="Status">
            <Select style={{ width: 120 }}>
              {statusOptions.map((status: OptionType) => {
                return (
                  <Option value={status.value as string} key={status.value as string}>
                    {status.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <CategoryTree data={categories || []} label="Category" />
        </SimpleSearch>
        {/* <AdvancedSearch
          type="Products"
          savedSearches={data?.savedSearches}
          repository={ProductRepository}
        >
          <ProductsSearchForm></ProductsSearchForm>
        </AdvancedSearch> */}
        <Box variant="card">
          {isPricingPage ? null : ( // <PricingTable products={data?.products || []} loading={loading}></PricingTable>
            <ProductsTable
              products={data?.products || []}
              totalItems={data?.total || 0}
              loading={loading}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
