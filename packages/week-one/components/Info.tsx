import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Typography, Space, Button, Tabs } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import styles from './styles/info.module.scss';
import type { infoFragment as infoFragmentType } from '../gqls/types';

interface PropsType {
  info: infoFragmentType;
}

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Info = ({ info: { name, websiteUrl, ...info } }: PropsType) => {
  const { t } = useTranslation('info');

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
    </>
  );
};

export default React.memo(Info);
