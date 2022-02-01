import React from 'react';
import Image from 'next/image';
import { Typography, Space } from 'antd';

import styles from './styles/info.module.scss';
import type { infoFragment as infoFragmentType } from '../gqls/types';

interface PropsType {
  info: infoFragmentType;
}

const { Title, Text } = Typography;

const Info = ({ info: { name, address, phone, date } }: PropsType) => (
  <>
    <Title className={styles.title}>{name}</Title>

    {/* TODO */}
    <Text className={styles.rating}>4.1 古色古香，適合攜家帶眷！</Text>

    <Space className={styles.info} direction="vertical">
      {[
        {
          key: 'address',
          text: address,
          underline: true,
        },
        {
          key: 'phone',
          text: phone,
        },
        {
          key: 'date',
          text: date,
        },
      ].map(({ key, text, ...props }) => (
        <Text {...props} key={key}>
          <>
            <span>
              <Image src={`/info/${key}.svg`} width={20} height={20} />
            </span>

            {text}
          </>
        </Text>
      ))}
    </Space>
  </>
);

export default React.memo(Info);
