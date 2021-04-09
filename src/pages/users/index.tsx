import { Button, Input, Form } from 'antd';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { Box, Text } from 'rebass';
import { useTableData } from 'hooks/fetch-table-data';
import { SimpleSearch } from 'components/app/SimpleSearch';
import { SearchOutlined } from '@ant-design/icons';
import { UsersTable } from 'components/pages/users/UsersTable';
import Link from 'next/link';

const UserRepository = RepositoryFactory.get('user');

export default function Index() {
  const { loading, data } = useTableData(UserRepository.get, 'users');

  return (
    <Box>
      <Box>
        <Text variant="pageHeading">
          Administrators{' '}
          <Link href="/users/[id]" as="/users/new">
            <Button type="primary">Add user</Button>
          </Link>
        </Text>
      </Box>
      <SimpleSearch noAdvanced>
        <Form.Item name="name" label="&nbsp;">
          <Input style={{ width: 220 }} placeholder="Search name" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input style={{ width: 220 }} placeholder="Email" />
        </Form.Item>
      </SimpleSearch>
      <Box variant="card">
        <UsersTable data={data} loading={loading} />
      </Box>
    </Box>
  );
}
