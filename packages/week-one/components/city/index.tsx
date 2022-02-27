import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Breadcrumb } from 'antd';

import { CITIES } from '../../utils/constants';

interface PropsType {
  city: typeof CITIES[number];
}

const { Item } = Breadcrumb;

const City = ({ city }: PropsType) => {
  const { t } = useTranslation('city');

  return (
    <Breadcrumb>
      {[
        {
          key: 'taiwan',
          href: '/',
        },
        {
          key: `cities.${city}`,
          href: `/${city}`,
        },
      ].map(({ key, href }: { key: string; href?: string }) => (
        <Item key={key}>
          {!href ? (
            key
          ) : (
            <Link href={href}>
              <a>{t(`common:${key}`)}</a>
            </Link>
          )}
        </Item>
      ))}
    </Breadcrumb>
  );
};

export default React.memo(City);
