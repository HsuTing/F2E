import React, { useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Typography, Space, Button, Tabs, Carousel } from 'antd';
import type { CarouselProps } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import styles from './styles/info.module.scss';
import type { infoFragment as infoFragmentType } from '../gqls/types';

interface PropsType {
  info: infoFragmentType;
}

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Info = ({ info: { name, websiteUrl, pictures, ...info } }: PropsType) => {
  const { t } = useTranslation('info');
  const bigCarouselRef = useRef<CarouselProps['asNavFor']>();
  const smallCarouselRef = useRef<CarouselProps['asNavFor']>();

  return (
    <>
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

      <Carousel
        // @ts-ignore FIXME
        ref={bigCarouselRef}
        asNavFor={smallCarouselRef.current}
        draggable
      >
        {pictures.map(({ url }) => (
          <img key={url} src={url} />
        ))}
      </Carousel>

      {pictures.length === 0 ? null : (
        <Carousel
          // @ts-ignore FIXME
          ref={smallCarouselRef}
          asNavFor={bigCarouselRef.current}
          draggable
        >
          {pictures.map(({ url }) => (
            <img key={url} src={url} />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default React.memo(Info);
