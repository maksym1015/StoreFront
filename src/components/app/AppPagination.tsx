import { Row, Col, Space, Pagination, Select, Menu } from 'antd';
import { useState, useEffect } from 'react';
const { Option } = Select;
import { OptionType } from 'types/option';
import { PER_PAGE_OPTIONS } from 'utils/constant';
import PerPageConfig from 'helpers/per-page-config';
import { useRouter } from 'next/router';
import { SettingDropdown } from 'components/app/SettingDropdown';
import { notification } from 'antd';

interface Props {
  storageKey: string;
  totalItems?: number;
  type: string;
  menu: OptionType[];
  qtySelected: number;
  onClickBulk: (value: string) => void;
}

const AppPagination: React.FC<Props> = ({
  storageKey,
  totalItems,
  type,
  onClickBulk,
  menu,
  qtySelected,
}) => {
  const router = useRouter();
  const [perPage, setPerpage] = useState(PerPageConfig.getPerPage(storageKey));
  const pageInRouteParam = parseInt(router.query.currentPage as string) || 1;
  const [page, setPage] = useState(pageInRouteParam);

  const onChangePerPage = (value: number) => {
    setPerpage(value);
    PerPageConfig.setPerPage(storageKey, value);
    onChangePage(1);
  };

  const onChangePage = (value: number) => {
    setPage(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, currentPage: value },
    });
  };

  useEffect(() => {
    setPage(pageInRouteParam);
  }, [pageInRouteParam]);

  const settingMenu = (
    <Menu>
      {menu.map((item) => {
        return (
          <Menu.Item
            key={item.value as string}
            onClick={() => {
              if (!qtySelected) {
                notification.warn({
                  message: 'Error',
                  description: `Please select ${type.toLocaleLowerCase()}`,
                });
                return;
              }
              onClickBulk(item.value as string);
            }}
          >
            {item.label}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Row justify="space-between" style={{ marginBottom: 10 }}>
      <Col>
        <Space>
          <Select defaultValue={perPage} style={{ width: 135 }} onChange={onChangePerPage}>
            {PER_PAGE_OPTIONS.map((option: OptionType) => {
              return (
                <Option value={option.value as string} key={option.value as string}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
          <span>
            {totalItems} {type}
          </span>
        </Space>
      </Col>
      <Col>
        <Space>
          <Pagination
            total={totalItems}
            showLessItems
            showSizeChanger={false}
            current={page}
            onChange={onChangePage}
            pageSize={perPage}
          ></Pagination>
          <SettingDropdown big overlay={settingMenu}></SettingDropdown>
        </Space>
      </Col>
    </Row>
  );
};

export default AppPagination;
