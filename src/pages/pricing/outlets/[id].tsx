import { BreadcrumbItem } from 'types';
import { AppBreadcrumb } from 'components/app/AppBreadcrumb';
import { Box } from 'rebass';
import { Form, Input, Button, Select, Spin, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form';
import { useRef, useState, useEffect } from 'react';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { useRouter } from 'next/router';
import { usePageData } from 'hooks/fetch-page-data';
import { AppSpin } from 'components/app/Spin';
import { useLoadingEvent } from 'hooks/event';
import { REQUEST_NAME } from 'utils/constant';
import { User, SelectedItem } from 'types';
import { useDebouncedCallback } from 'use-debounce';
import { ProductPicker } from 'components/app/ProductPicker';
import { ManageSelectedItems } from 'components/app/ManageSelectedItems';

const UserRepository = RepositoryFactory.get('user');
const { Option } = Select;
const { Text } = Typography;

const OutletPricing: React.FC = () => {
  const formInstance = useRef<FormInstance>(null);
  const router = useRouter();
  const isAdd = router.query.id === 'new';
  const saving = useLoadingEvent([REQUEST_NAME.UPDATE_USER]);
  const [fetching, setFetching] = useState(false);
  const [outlets, setOutlets] = useState<User[]>([]);
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedItem[]>([]);

  const { loading, data } = usePageData(() => {
    if (!isAdd) {
      return UserRepository.get({ userId: router.query.id as string });
    }
  });

  const user = data?.users[0];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Outlet Specific Pricing ',
      pathname: '/pricing/outlets',
      as: '/pricing/outlets',
    },
  ];

  if (isAdd) {
    breadcrumbs.push({
      label: 'Add pricing ',
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
    await UserRepository.createUserPricing(params as any);

    if (isAdd) {
      router.push('/pricing/outlets');
    }
  };

  const save = () => {
    formInstance.current?.submit();
  };

  const [fetchOutlets] = useDebouncedCallback(async (q: string) => {
    if (!q || !q.trim()) {
      return;
    }
    setFetching(true);
    try {
      const data = await UserRepository.findOUtlet(q);
      setOutlets(data.users);
    } catch (e) {}
    setFetching(false);
  }, 300);

  useEffect(() => {
    formInstance?.current?.setFieldsValue({
      products: selectedProducts.map((o) => o.id).join(','),
    });
  }, [selectedProducts]);

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
          <Box sx={{ maxWidth: '460px', p: 3 }}>
            <Form layout="vertical" ref={formInstance} onFinish={onFinish}>
              <Form.Item
                label="Outlet *"
                name="outlet"
                rules={[{ required: true, message: 'Please select outlet' }]}
              >
                <Select
                  showSearch
                  placeholder="Search..."
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={fetchOutlets}
                >
                  {outlets.map((d) => {
                    return (
                      <Option key={d.id} value={d.id}>
                        {d.outletName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Products *"
                name="products"
                rules={[{ required: true, message: 'Please select products' }]}
              >
                <Input style={{ display: 'none' }} />
                <Box sx={{ mb: 3 }}>
                  <Button
                    type="default"
                    onClick={() => {
                      setOpenPicker(true);
                    }}
                  >
                    Add products
                  </Button>
                </Box>
                <ProductPicker
                  visible={isOpenPicker}
                  onCancel={() => {
                    setOpenPicker(false);
                  }}
                  onChange={setSelectedProducts}
                  selectedProducts={selectedProducts}
                ></ProductPicker>
                <ManageSelectedItems
                  items={selectedProducts}
                  inline
                  onChange={setSelectedProducts}
                ></ManageSelectedItems>
              </Form.Item>
              <Form.Item label="Price (£) *">
                <Text type="warning">
                  Fee % & Logistic Fee will be respected from the product and included in the sell
                  out price. The input price you add below will auto calculate the sell out price on
                  save. These cannot be shown on creation
                </Text>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>Input price ex VAT</th>
                      <th>Starstock Fee</th>
                      <th>Logistics Fee</th>
                      <th>Sell out price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Item
                          name="price"
                          style={{ margin: 0 }}
                          rules={[{ required: true, message: 'Price is required' }]}
                        >
                          <Input type="number"></Input>
                        </Form.Item>
                      </td>
                      <td>3%</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </Form.Item>
            </Form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OutletPricing;
