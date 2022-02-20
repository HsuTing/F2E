import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Breadcrumb, Typography, Space, Button, Tabs, Carousel } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import styles from './styles/info.module.scss';
import type { infoFragment as infoFragmentType } from '../gqls/types';
import { INFO_TYPES, ZIP_CODES } from '../utils/constants';

interface PropsType {
  infoType: typeof INFO_TYPES[number];
  info: infoFragmentType;
}

const { Item } = Breadcrumb;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Info = ({
  infoType,
  info: { name, zipCode, websiteUrl, pictures, ...info },
}: PropsType) => {
  const { t } = useTranslation('info');
  // FIXME
  const carouselRef = useRef<any>();
  const city = ZIP_CODES[zipCode];

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
          {
            key: infoType,
            href: `/${city}/${infoType}`,
          },
          {
            key: name,
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
        {name}

        {/* TODO */}
        <Button icon={<HeartOutlined />} shape="circle" size="large" />
      </Title>

      {/* TODO */}
      <Text className={styles.rating}>4.1 古色古香，適合攜家帶眷！</Text>

      <Space className={styles.info} direction="vertical">
        {(
          [
            {
              key: 'address',
              underline: true,
            },
            {
              key: 'phone',
            },
            {
              key: 'date',
            },
          ] as const
        ).map(({ key, ...props }) => (
          <Text {...props} key={key}>
            <>
              <span>
                <Image src={`/info/${key}.svg`} width={20} height={20} />
              </span>

              {info[key]}
            </>
          </Text>
        ))}
      </Space>

      <Tabs className={styles.tabs}>
        {(
          [
            'descriptionDetail',
            'ticketInfo',
            'travelInfo',
            'remarks',
            'comments',
          ] as const
        ).map(key => (
          <TabPane key={key} tab={t(key)}>
            {info[key]}
          </TabPane>
        ))}
      </Tabs>

      <Button
        className={styles.goButton}
        href={websiteUrl}
        type="primary"
        ghost
      >
        {t('go-to-website')}
      </Button>

      <Carousel ref={carouselRef} draggable>
        {pictures.map(({ url }) => (
          <img key={url} src={url} />
        ))}
      </Carousel>

      {pictures.length <= 1 ? null : (
        <div>
          {pictures.map(({ url }, index) => (
            <img
              key={url}
              src={url}
              onClick={() => carouselRef.current.goTo(index, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Info);
