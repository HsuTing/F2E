import React from 'react';
import Link from 'next/link';
import { Breadcrumb as AntdBreadcrumb } from 'antd';

interface PropsType {
  items: (
    | string
    | {
        text: string;
        href: string;
      }
  )[];
}

const { Item } = AntdBreadcrumb;

const Breadcrumb = ({ items }: PropsType) => (
  <AntdBreadcrumb>
    {items.map(item =>
      typeof item === 'string' ? (
        <Item key={item}>{item}</Item>
      ) : (
        <Item key={item.text}>
          <Link href={item.href}>
            <a>{item.text}</a>
          </Link>
        </Item>
      ),
    )}
  </AntdBreadcrumb>
);

export default React.memo(Breadcrumb);
