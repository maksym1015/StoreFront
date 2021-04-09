import { Row, Input, Form, Col, Select } from 'antd';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { Box, Text } from 'rebass';
import { useTableData } from 'hooks/fetch-table-data';
import { SimpleSearch } from 'components/app/SimpleSearch';
import { OutletsTable } from 'components/pages/outlets/OutletsTable';
import { AdvancedSearch } from 'components/app/AdvancedSearch';

const OutletRepository = RepositoryFactory.get('outlet');

export default function Outlets() {
  const { loading, data } = useTableData(OutletRepository.get, 'outlets', {
    userType: 'C',
  });

  return (
    <Box>
      <Row justify="space-between">
        <Text variant="pageHeading">Outlets</Text>
        <span></span>
      </Row>
      <SimpleSearch expandMode={true} initialValues={{ outletStyle: '' }}>
        <Col xs={12}>
          <Form.Item name="outlet" label="Outlet">
            <Input></Input>
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item name="outletStyle" label="Outlet Style">
            <Select>
              <Select.Option value="">All</Select.Option>
              {data?.outletStyles.map((item) => {
                return (
                  <Select.Option value={item.value as string} key={item.value as string}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </SimpleSearch>
      <AdvancedSearch
        type="Outlets"
        repository={OutletRepository}
        savedSearches={[]}
      ></AdvancedSearch>
      <Box variant="card">
        <OutletsTable data={data} loading={loading} />
      </Box>
    </Box>
  );
}
