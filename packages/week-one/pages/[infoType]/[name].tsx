import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import Carousels from '../../components/carousels';
import type { getDetailPage as getDetailPageType } from '../../gqls/types';
import { getDetailPage } from '../../gqls/detail';
import { carouselsFragment } from '../../components/carousels/gqls';
import { initializeApollo } from '../../hooks/useApollo';
import { INFO_TYPES } from '../../utils/constants';

const Detail = () => {
  const { data } = useQuery<getDetailPageType>(getDetailPage);

  return <Carousels {...filter(carouselsFragment, data || {})} />;
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

  const client = initializeApollo();

  try {
    await client.query<getDetailPageType>({
      query: getDetailPage,
    });
  } catch (e) {
    // error would be handled in useApollo
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'carousels'])),
      initialApolloState: client.cache.extract(),
      name,
    },
  };
};

export default React.memo(Detail);
