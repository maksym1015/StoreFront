import { AppBreadcrumb } from 'components/app/AppBreadcrumb';
import { BreadcrumbItem, Address } from 'types';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { useRouter } from 'next/router';
import { AppSpin } from 'components/app/Spin';
import { Row, Col } from 'antd';
import { NextBack } from 'components/app/NextBack';
import { OrderItemsTable } from 'components/pages/orders/OrderItemsTable';
import { Currency } from 'components/app/Currency';
import { Box, Text } from 'rebass';
import OrderStatus from 'components/app/OrderStatus';
import { usePageData } from 'hooks/fetch-page-data';

const OrderRepository = RepositoryFactory.get('order');

const OrderDetail: React.FC = () => {
  const router = useRouter();
  const { loading, data } = usePageData(() => {
    return OrderRepository.getOrderDetail(router.query.id as string);
  }, ['id']);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Orders',
      pathname: '/orders',
      as: '/orders',
    },
  ];

  if (data) {
    breadcrumbs.push({
      label: `Order ${data.order.id}`,
      pathname: router.pathname,
      as: '#',
    });
  }

  const renderAddress = (address: Address) => {
    return (
      <Text sx={{ textAlign: 'right', fontSize: 16 }}>
        <Text>{address.fullName}</Text>
        {address.address && <Text>{address.address}</Text>}
        {address.address2 && <Text>{address.address2}</Text>}
        {address.city && <Text>{address.city}</Text>}
        {(address.stateDescription || address.zip) && (
          <Text>
            {address.stateDescription} {address.zip}
          </Text>
        )}
        {address.countryDescription && <Text>{address.countryDescription}</Text>}
      </Text>
    );
  };

  return (
    <div>
      <Box variant="breadcrumbHeader">
        <AppBreadcrumb items={breadcrumbs}></AppBreadcrumb>
        <NextBack basePath="/orders" data={data?.viewTools}></NextBack>
      </Box>
      {loading || !data ? (
        <AppSpin></AppSpin>
      ) : (
        <Row gutter={80}>
          <Col xs={16}>
            <Box variant="card">
              <OrderItemsTable items={data.order.products}></OrderItemsTable>
            </Box>
          </Col>
          <Col xs={8}>
            <Box sx={{ backgroundColor: 'lightGrey', p: 3, mb: 20, mt: 3 }}>
              <Text variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                DELIVERY ADDRESS
              </Text>
              {renderAddress(data.order.shipping)}
            </Box>
            <Box sx={{ backgroundColor: 'lightGrey', p: 3 }}>
              <Text variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                BILLING ADDRESS
              </Text>
              {renderAddress(data.order.billing)}
            </Box>
            <Box sx={{ backgroundColor: 'lightGrey', mb: 20, mt: 3 }}>
              <Box sx={{ p: 3 }}>
                <Text variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                  ORDER TOTAL
                </Text>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    fontSize: 16,
                    gap: 10,
                    wordBreak: 'break-word',
                  }}
                >
                  <Text>SUBTOTAL (Ex vat)</Text>
                  <Text sx={{ fontSize: 18, fontWeight: 600 }} textAlign="right">
                    <Currency value={data.order.subtotal} />
                  </Text>
                  <Text>ORDER DATE</Text>
                  <Text textAlign="right">{data.order.date}</Text>
                  <Text>ORDER MADE BY</Text>
                  <Text textAlign="right">{data.order.customer.fullName}</Text>
                  <Text>CONTACT DETAILS</Text>
                  <Text textAlign="right">{data.order.customer.email}</Text>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <OrderStatus status={data.order.status} />
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: 'midGrey',
                  py: '12px',
                  px: 3,
                  fontWeight: 600,
                  fontSize: 25,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Text>TOTAL</Text>
                <Currency value={data.order.total} />
              </Box>
            </Box>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderDetail;
