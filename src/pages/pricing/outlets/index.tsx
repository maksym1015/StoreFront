import { Input, Button, Form, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { Box, Text } from 'rebass';
import { useTableData } from 'hooks/fetch-table-data';
import { SimpleSearch } from 'components/app/SimpleSearch';
import { AdvancedSearch } from 'components/app/AdvancedSearch';
import { OutletsPricingTable } from 'components/pages/pricing/OutletsPricingTable';
import Link from 'next/link';

const OutletRepository = RepositoryFactory.get('outlet');

export default function Outlets() {
  const { loading, data } = useTableData(OutletRepository.getUserPricing, 'outletsPricing');

  return (
    <Box>
      <Box>
        <Text variant="pageHeading">
          Outlet Specific Pricing{' '}
          <Link href="/pricing/outlets/[id]" as="/pricing/outlets/new">
            <Button type="primary">Add pricing</Button>
          </Link>
        </Text>
      </Box>
      <SimpleSearch expandMode={true}>
        <Space size={14}>
          <Form.Item name="outlet" label="&nbsp;">
            <Input style={{ width: 200 }} placeholder="Outlet" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item name="product" label="Product">
            <Input style={{ width: 200 }} placeholder="Product" />
          </Form.Item>
        </Space>
      </SimpleSearch>
      <AdvancedSearch
        type="Products"
        repository={OutletRepository}
        savedSearches={[]}
      ></AdvancedSearch>
      <Box variant="card">
        <OutletsPricingTable data={data} loading={loading} />
      </Box>
    </Box>
  );
}
