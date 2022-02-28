import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Breadcrumb, Typography, Button } from 'antd';

import styles from './styles/index.module.scss';
import { CITIES, INFO_TYPES } from '../../utils/constants';
import ScenicSpots from './ScenicSpots';
import Hotels from './Hotels';
import Activities from './Activities';

export interface PropsType {
  city: typeof CITIES[number];
}

const { Item } = Breadcrumb;
const { Title } = Typography;

const icons = {
  'scenic-spots': <ScenicSpots />,
  hotels: <Hotels />,
  activities: <Activities />,
};

const City = ({ city }: PropsType) => {
  const { t } = useTranslation('city');

  return (
    <div className={styles.root}>
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

      <Title className={styles.title}>
        {t('explore')}
        {t(`common:cities.${city}`)}
      </Title>

      <div className={styles.buttons}>
        {INFO_TYPES.map(key => (
          <Link key={key} href={`/${city}/${key}`}>
            <Button key={key} size="large">
              {t(key)}

              {icons[key]}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(City);
