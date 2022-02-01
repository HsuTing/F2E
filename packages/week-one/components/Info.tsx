import React from 'react';
import Image from 'next/image';
import { Typography, Space, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import styles from './styles/info.module.scss';
import type { infoFragment as infoFragmentType } from '../gqls/types';

interface PropsType {
  info: infoFragmentType;
}

const { Title, Text } = Typography;

const Info = ({ info: { name, ...info } }: PropsType) => (
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
  </>
);

export default React.memo(Info);
