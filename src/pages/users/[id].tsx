import { BreadcrumbItem } from 'types';
import { AppBreadcrumb } from 'components/app/AppBreadcrumb';
import { Box } from 'rebass';
import { Form, Input, Button, Radio } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form';
import { useRef } from 'react';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { useRouter } from 'next/router';
import { usePageData } from 'hooks/fetch-page-data';
import { AppSpin } from 'components/app/Spin';
import { PLACEHOLDER_PASSWORD } from 'utils/constant';
import { useLoadingEvent } from 'hooks/event';
import { REQUEST_NAME } from 'utils/constant';

const UserRepository = RepositoryFactory.get('user');

const UserDetail: React.FC = () => {
  const formInstance = useRef<FormInstance>(null);
  const router = useRouter();
  const isAdd = router.query.id === 'new';
  const saving = useLoadingEvent([REQUEST_NAME.UPDATE_USER]);

  const { loading, data } = usePageData(() => {
    if (!isAdd) {
      return UserRepository.get({ userId: router.query.id as string });
    }
  });

  const user = data?.users[0];
  const initialForm = user
    ? { ...user, password: PLACEHOLDER_PASSWORD, confirm: PLACEHOLDER_PASSWORD }
    : { status: 'A' };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Administrators ',
      pathname: '/users',
      as: '/users',
    },
  ];

  if (isAdd) {
    breadcrumbs.push({
      label: 'Add user ',
      pathname: '',
      as: '#',
    });
  } else if (user) {
    breadcrumbs.push({
      label: user.fullName,
      pathname: '',
      as: '#',
    });
  }

  const onFinish = async (values: Store) => {
    const params = isAdd ? values : { ...values, id: router.query.id };
    await UserRepository.postUser(params as any);

    if (isAdd) {
      router.push('/users');
    }
  };

  const save = () => {
    formInstance.current?.submit();
  };

  return (
    <Box>
      <Box variant="breadcrumbHeader">
        <AppBreadcrumb items={breadcrumbs}></AppBreadcrumb>
        <Button type="primary" onClick={save} loading={saving}>
          Save
        </Button>
      </Box>
      {loading ? (
        <AppSpin></AppSpin>
      ) : (
        <Box variant="card">
          <Box sx={{ maxWidth: '360px', p: 3 }}>
            <Form
              layout="vertical"
              name="basic"
              ref={formInstance}
              autoComplete="off"
              initialValues={initialForm}
              onFinish={onFinish}
            >
              <Form.Item
                label="First Name *"
                name="firstName"
                rules={[{ required: true, message: 'First name is required' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name *"
                name="lastName"
                rules={[{ required: true, message: 'Last Name is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email *"
                name="email"
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password *"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password *"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(...params) {
                      const value = params[1];
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status *"
                rules={[
                  {
                    required: true,
                    message: 'Please select status',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="A">Active</Radio>
                  <Radio value="D">Disabled</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDetail;
