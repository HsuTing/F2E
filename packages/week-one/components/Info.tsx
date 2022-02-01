import React from 'react';
import { Typography, Space } from 'antd';

import type { infoFragment as infoFragmentType } from '../gqls/types';

interface PropsType {
  info: infoFragmentType;
}

const { Title, Text } = Typography;

const Info = ({ info: { name, address, phone, date } }: PropsType) => (
  <>
    <Title>{name}</Title>

    <Space direction="vertical">
      {[
        {
          key: 'address',
          children: address,
          underline: true,
        },
        {
          key: 'phone',
          children: phone,
        },
        {
          key: 'date',
          children: date,
        },
      ].map(({ key, ...props }) => (
        <Text {...props} key={key} />
      ))}
    </Space>
  </>
);

export default React.memo(Info);
