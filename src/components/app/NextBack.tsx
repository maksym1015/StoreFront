import { ViewTool } from 'types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'rebass';

interface Props {
  data?: ViewTool;
  basePath: string;
}

const itemStyle = {
  width: '34px',
  height: '34px',
  bg: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  ':hover': {
    color: 'primary',
  },
};

export const NextBack: React.FC<Props> = ({ data, basePath }) => {
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex' }}>
      <Space size={10}>
        <Link href={router.pathname} as={`${basePath}/${data?.prevId}`}>
          <Box sx={{ ...itemStyle, pointerEvents: data?.prevId ? undefined : 'none' }}>
            <LeftOutlined></LeftOutlined>
          </Box>
        </Link>
        <Link href={router.pathname} as={`${basePath}/${data?.nextId}`}>
          <Box sx={{ ...itemStyle, pointerEvents: data?.nextId ? undefined : 'none' }}>
            <RightOutlined></RightOutlined>
          </Box>
        </Link>
      </Space>
    </Box>
  );
};
