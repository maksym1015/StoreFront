import { Menu } from 'antd';
import Logo from 'assets/icons/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box } from 'rebass';

const { SubMenu } = Menu;

export default function TheSidebar() {
  const router = useRouter();
  const defaultSelected = `/${router.pathname.split('/')[1]}`;
  const links = [] as any;

  return (
    <Menu
      style={{ height: '100%', fontWeight: 500, textTransform: 'uppercase', paddingLeft: 16 }}
      defaultSelectedKeys={[defaultSelected]}
      defaultOpenKeys={[defaultSelected, '/pricing']}
      mode="inline"
      className="side-bar"
    >
      <Link href="/">
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            py: 4,
            px: 3,
            ml: '-16px',
          }}
        >
          <Logo width="100%" />
        </Box>
      </Link>
      <Menu.Item key="/">
        <Link href="/">
          <a>Dashboard</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/orders">
        <Link href="/orders">
          <a>Orders</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/outlets">
        <Link href="/outlets">
          <a>Outlets</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link href="/users">
          <a>Administrators</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/products">
        <Link href="/products">
          <a>Products</a>
        </Link>
      </Menu.Item>
      <SubMenu title="Pricing" key="/pricing">
        <Menu.Item key="/pricing/products">
          <Link href="/pricing/products">
            <a>Product Pricing</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/pricing/outlets">
          <Link href="/pricing/outlets">
            <a>Outlets Pricing</a>
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/reports">
        <Link href="/reports">
          <a>Reports</a>
        </Link>
      </Menu.Item>
      <SubMenu key="/documents" title="Support">
        {links.map((item: any) => {
          const isInternalPage = item.link && item.link.includes('?dispatch=wp/');
          return (
            <Menu.Item key={item.name}>
              {isInternalPage ? (
                <Link
                  href="/documents/[slug]"
                  as={`/documents/${item.link.split('?dispatch=wp/')[1]}`}
                >
                  <a>{item.name}</a>
                </Link>
              ) : (
                <a target="_blank" href={item.link}>
                  {item.name}
                </a>
              )}
            </Menu.Item>
          );
        })}
      </SubMenu>
    </Menu>
  );
}
