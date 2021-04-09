import { Layout } from 'antd';
import TheHeader from './TheHeader';
import TheSidebar from './TheSidebar';
const { Content, Sider } = Layout;
import { useRouter } from 'next/router';
import { Box } from 'rebass';

const blankLayoutRoutes = ['/login'];

const AppLayout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  if (blankLayoutRoutes.includes(pathname)) {
    return (
      <Box
        sx={{
          bg: '#f4f5f6',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    );
  }
  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      <Sider
        width={280}
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '100vh',
          position: 'sticky',
          backgroundColor: '#1C2638',
          top: 0,
          left: 0,
        }}
      >
        <TheSidebar />
      </Sider>
      <Layout>
        <TheHeader />
        <Content className="main-layout-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
