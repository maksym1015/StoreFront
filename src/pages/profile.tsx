import { BreadcrumbItem } from 'types';
import { AppBreadcrumb } from 'components/app/AppBreadcrumb';
import { Box } from 'rebass';
import { Row, Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form';
import { useRef } from 'react';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { AppSpin } from 'components/app/Spin';
import { PLACEHOLDER_PASSWORD } from 'utils/constant';
import { useLoadingEvent } from 'hooks/event';
import { REQUEST_NAME } from 'utils/constant';
import { useContext } from 'react';
import { AppContextComponent } from 'lib/context';

const UserRepository = RepositoryFactory.get('user');

const Profile: React.FC = () => {
  const formInstance = useRef<FormInstance>(null);
  const {
    state: { currentUser },
  } = useContext(AppContextComponent);
  const saving = useLoadingEvent([REQUEST_NAME.UPDATE_USER]);

  const initialForm = currentUser
    ? { ...currentUser, password: PLACEHOLDER_PASSWORD, confirm: PLACEHOLDER_PASSWORD }
    : {};

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Profile ',
      pathname: '',
      as: '#',
    },
  ];

  const onFinish = async (values: Store) => {
    const params = { ...values, id: currentUser?.id };
    await UserRepository.postUser(params as any);
  };

  const save = () => {
    formInstance.current?.submit();
  };

  return (
    <Box>
      <Row justify="space-between">
        <AppBreadcrumb items={breadcrumbs}></AppBreadcrumb>
        <Button type="primary" onClick={save} loading={saving}>
          Save
        </Button>
      </Row>
      {!currentUser ? (
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
            </Form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
