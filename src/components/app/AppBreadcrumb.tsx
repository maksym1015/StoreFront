import { Breadcrumb } from 'antd';
import { BreadcrumbItem } from 'types';
import Router from 'next/router';

interface Props {
  items: BreadcrumbItem[];
}

export const AppBreadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <Breadcrumb separator=">">
      {items.map((item, i) => {
        return (
          <Breadcrumb.Item
            href={item.as}
            key={item.as}
            onClick={(e) => {
              e.preventDefault();
              if (i !== items.length - 1) {
                Router.push(item.pathname, item.as);
              }
            }}
          >
            {item.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
