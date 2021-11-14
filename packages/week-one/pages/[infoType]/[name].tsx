import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { INFO_TYPES } from '../../utils/constants';

const Detail = () => {
  return null;
};

export const getServerSideProps = async ({
  locale,
  query: { infoType, name },
}: {
  locale: string;
  query: {
    infoType: typeof INFO_TYPES[number];
    name: string;
  };
}) => {
  if (!INFO_TYPES.includes(infoType)) return { notFound: true };

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      name,
    },
  };
};

export default React.memo(Detail);
