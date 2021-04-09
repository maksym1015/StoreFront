import { Card, Col, List, Row, Select, Statistic, Timeline } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { usePageData } from 'hooks/fetch-page-data';
import moment from 'moment';
import Head from 'next/head';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, BoxProps, Image, Text } from 'rebass';
import { RepositoryFactory } from 'repositories/RepositoryFactory';

const DashboardRepository = RepositoryFactory.get('dashboard');

const chartData = {
  labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Number of Orders',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: '#FE5568',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#FE5568',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FE5568',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const TimeLineDot: React.FC<BoxProps> = ({ sx }) => (
  <Box
    sx={{
      ...sx,
      height: 18,
      width: 18,
      borderRadius: '50%',
      backgroundColor: 'primary',
    }}
  />
);

const LineSeparator = () => (
  <Box width={40} mx={2}>
    <hr style={{ borderTop: '1px solid #fe5568' }} />
  </Box>
);

const TextLine: React.FC<{ date: string; title: string }> = ({ date, title, children }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', py: 2, cursor: 'pointer' }}>
    <Text width={60}>{date}</Text>
    <TimeLineDot sx={{ mx: 2 }} />
    <Text sx={{ fontWeight: 600, textTransform: 'uppercase' }}>{title}</Text>
    <LineSeparator />
    <Text>{children}</Text>
  </Box>
);

const { Option } = Select;

const Dashboard: React.FC = () => {
  const { data } = usePageData(() => {
    return DashboardRepository.get();
  });

  const today = moment().format('D MMM');

  const topProducts = data?.topSellingSkus.slice(0, 5);

  const rectCardStyle = {
    color: '#fff',
    minHeight: 130,
  };

  const squareCardStyle = {
    minHeight: 154,
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Box>
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} xl={8}>
            <Row>
              <Col span={24}>
                <Card
                  bordered={false}
                  bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 12, paddingBottom: 12 }}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box>{today}, TODAY</Box>
                    <Select defaultValue="TODAY" style={{ width: 120 }} size="small">
                      <Option value="TODAY">TODAY</Option>
                      <Option value="YESTERDAY">YESTERDAY</Option>
                    </Select>
                  </Box>
                </Card>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Card bordered={false} bodyStyle={{ ...rectCardStyle, backgroundColor: '#1b2638' }}>
                  <Statistic
                    value={123}
                    valueStyle={{ color: '#fff' }}
                    title={<Text color="#fff">Number of Orders</Text>}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Card bordered={false} bodyStyle={{ ...rectCardStyle, backgroundColor: '#333c4c' }}>
                  <Statistic
                    value="£34,865.76"
                    valueStyle={{ color: '#fff' }}
                    title={<Text color="#fff">Value of Orders</Text>}
                  />
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xs={24} xl={8} style={{ minHeight: '100%' }}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Card
                  bordered={false}
                  bodyStyle={{ ...squareCardStyle, backgroundColor: '#1c2638' }}
                >
                  <Statistic value={350} valueStyle={{ color: '#fff' }} suffix="Active Products" />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  bordered={false}
                  bodyStyle={{ ...squareCardStyle, backgroundColor: '#606774' }}
                >
                  <Statistic value={28} valueStyle={{ color: '#fff' }} suffix="Ordering Accounts" />
                </Card>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Card
                  bordered={false}
                  bodyStyle={{ ...squareCardStyle, backgroundColor: '#333c4c' }}
                >
                  <Statistic value={12} valueStyle={{ color: '#fff' }} suffix="Active Promotions" />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  bordered={false}
                  bodyStyle={{ ...squareCardStyle, backgroundColor: '#495160' }}
                >
                  <Statistic value={800} valueStyle={{ color: '#fff' }} suffix="Volume (L)" />
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xs={24} xl={8} style={{ paddingBottom: 8 }}>
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <Meta title="Top Products" style={{ textTransform: 'uppercase' }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 2,
                }}
              >
                <Box>{today}, TODAY</Box>
                <Box>
                  <Select defaultValue="TODAY" style={{ width: 120 }} size="small">
                    <Option value="TODAY">TODAY</Option>
                    <Option value="YESTERDAY">YESTERDAY</Option>
                  </Select>
                </Box>
              </Box>

              <List
                className="top-skus"
                itemLayout="horizontal"
                size="small"
                dataSource={topProducts}
                renderItem={(item, idx) => (
                  <Box
                    sx={{
                      display: 'flex',
                      borderBottom: idx < (topProducts?.length || 0) - 1 ? '1px solid #EFEFEF' : '',
                      py: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      sx={{ height: 38, width: 38, p: '2px', border: '1px solid #EFEFEF' }}
                      src={item.image}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, width: '100%' }}>
                      <Text sx={{ fontWeight: 500, textTransform: 'uppercase', mb: 1 }}>
                        {item.name}
                      </Text>
                      <Text sx={{ fontSize: 10, fontWeight: 500, color: 'midGrey' }}>
                        CODE: {item.code}
                      </Text>
                    </Box>
                  </Box>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={12}>
            <Card style={{ height: 300 }}>
              <Box sx={{ height: 250 }}>
                <Line data={chartData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card style={{ height: 300 }}>
              <Meta title="Rankings" style={{ textTransform: 'uppercase' }} />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  my: 2,
                }}
              >
                <Box sx={{ textTransform: 'uppercase' }}>Top 5 Promotions</Box>

                <Select defaultValue="PROMOTIONS" style={{ width: 130 }} size="small">
                  <Option value="PROMOTIONS">PROMOTIONS</Option>
                  <Option value="PRODUCTS">PRODUCTS</Option>
                </Select>
              </Box>

              <Box mt={4}>
                <Timeline style={{ padding: 0 }}>
                  <Timeline.Item key={1} dot={<TimeLineDot />}>
                    <Text sx={{ textTransform: 'uppercase', fontSize: 10, fontWeight: 500 }}>
                      BUY ANY 2 CASES OF SMIRNOFF FLAVOURED AND GET £10 DISCOUNT
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item key={2} dot={<TimeLineDot />}>
                    <Text sx={{ textTransform: 'uppercase', fontSize: 10, fontWeight: 500 }}>
                      BUY 3 STELLA GET 1 FREE
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item key={3} dot={<TimeLineDot />}>
                    <Text sx={{ textTransform: 'uppercase', fontSize: 10, fontWeight: 500 }}>
                      COCA-COLA GIVE YOU ZERO
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item key={4} dot={<TimeLineDot />}>
                    <Text sx={{ textTransform: 'uppercase', fontSize: 10, fontWeight: 500 }}>
                      FREE SCHWEPPES TONIC WHEN YOU BUY 6
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item key={5} dot={<TimeLineDot />}>
                    <Text sx={{ textTransform: 'uppercase', fontSize: 10, fontWeight: 500 }}>
                      FREE SCHWEPPES TONIC WHEN YOU BUY 6
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Box>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={12}>
            <Card>
              <Meta title="Recommendations" style={{ textTransform: 'uppercase' }} />

              <Box sx={{ mt: 3 }}>
                <TextLine date="7th Jan" title="Add Images">
                  Add product images to SKU 123456
                </TextLine>
              </Box>

              <TextLine date="9th Jan" title="Add Allergens">
                Add allergens to SKU 123456
              </TextLine>

              <TextLine date="11th Jan" title="Add Description">
                Add product description to SKU 123456
              </TextLine>

              <TextLine date="12th Jan" title="Add Images">
                Add product images to SKU 123456
              </TextLine>
            </Card>
          </Col>

          <Col xs={24} xl={12}>
            <Card>
              <Meta title="Updates" style={{ textTransform: 'uppercase' }} />

              <Box sx={{ mt: 3 }}>
                <TextLine date="7th Jan" title="Product Approval">
                  Add product images to SKU 123456
                </TextLine>
              </Box>

              <TextLine date="9th Jan" title="Set Up Promotions">
                Add allergens to SKU 123456
              </TextLine>

              <TextLine date="11th Jan" title="New Product Report">
                Add product description to SKU 123456
              </TextLine>

              <TextLine date="12th Jan" title="Advanced Search">
                New advanced search added
              </TextLine>
            </Card>
          </Col>
        </Row>

        {/* <Row gutter={80}>
        <Col span={12}>
          <Box sx={{ height: '100%' }}>
            <Text as="h4" variant="h4" sx={{ borderBottom: '2px solid #EFEFEF', py: '10px' }}>
              best sellers
            </Text>
            <List
              className="top-skus"
              itemLayout="horizontal"
              dataSource={data?.topSellingSkus}
              renderItem={(item) => (
                <Box
                  sx={{
                    display: 'flex',
                    borderBottom: '1px solid #EFEFEF',
                    py: 3,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    sx={{ height: 67, width: 67, p: '2px', border: '1px solid #EFEFEF' }}
                    src={item.image}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, width: '40%' }}>
                    <Text sx={{ fontWeight: 500, textTransform: 'uppercase', mb: 2 }}>
                      {item.name}
                    </Text>
                    <Text sx={{ fontSize: 10, fontWeight: 500, color: 'midGrey' }}>
                      CODE: {item.code}
                    </Text>
                  </Box>
                  <Box>
                    <Text sx={{ fontSize: 10, fontWeight: 500, ml: 4 }}>
                      SOLD {item.amount} TIMES
                    </Text>
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Col>
        <Col span={12}>
          <Box sx={{ height: '100%' }}>
            <Text
              as="h4"
              variant="h4"
              sx={{ mb: 4, borderBottom: '2px solid #EFEFEF', py: '10px' }}
            >
              Recently Updated
            </Text>
            <Timeline>
              {(data?.updatedProducts || []).map((product) => {
                return (
                  <Timeline.Item
                    key={product.id}
                    dot={
                      <Box
                        sx={{
                          height: 18,
                          width: 18,
                          borderRadius: '50%',
                          backgroundColor: 'primary',
                        }}
                      ></Box>
                    }
                  >
                    <Link href="/products/[id]" as={`/products/${product.id}`}>
                      <a>
                        <Text
                          sx={{ textTransform: 'uppercase', fontSize: 10, fontWeight: 500, mb: 2 }}
                        >
                          {product.name}
                        </Text>
                      </a>
                    </Link>
                    <Text sx={{ fontSize: 10, color: 'midGrey', fontWeight: 500 }}>
                      CODE: {product.code}
                    </Text>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Box>
        </Col>
      </Row> */}
        {/* <Box variant="card" sx={{ mt: 4 }}>
      <Text as="h2" sx={{ mb: 3 }}>Earnings</Text>
      <Box sx={{ height: '25vw' }}>
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </Box>
    </Box> */}
      </Box>
    </>
  );
};

export default Dashboard;
