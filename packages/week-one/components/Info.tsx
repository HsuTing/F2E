import React from 'react';

import type { infoFragment as infoFragmentType } from '../gqls/types';

interface PropsType {
  info: infoFragmentType;
}

const Info = (_: PropsType) => {
  return null;
};

export default React.memo(Info);
