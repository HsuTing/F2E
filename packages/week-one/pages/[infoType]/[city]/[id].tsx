import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import Carousels from '../../../components/carousels';
import type {
  getDetailPage as getDetailPageType,
  getDetailPageVariables,
  InfoTypeEnum,
} from '../../../gqls/types';
import { getDetailPage } from '../../../gqls/detail';
import { carouselsFragment } from '../../../components/carousels/gqls';
import { initializeApollo } from '../../../hooks/useApollo';
import { INFO_TYPES } from '../../../utils/constants';

interface PropsType {
  variables: getDetailPageVariables;
}

const Detail = ({ variables }: PropsType) => {
  const { data } = useQuery<getDetailPageType, getDetailPageVariables>(
    getDetailPage,
    {
      variables,
    },
  );

  return <Carousels {...filter(carouselsFragment, data || {})} />;
};

export const getServerSideProps = async ({
  locale,
  query: { id, infoType },
}: {
  locale: string;
  query: {
    id: string;
    infoType: typeof INFO_TYPES[number];
  };
}) => {
  if (!INFO_TYPES.includes(infoType)) return { notFound: true };

  const client = initializeApollo();
  const variables = {
    id,
    infoType: {
      'scenic-spots': 'ScenicSpot',
      hotels: 'Hotel',
      activities: 'Activity',
    }[infoType] as InfoTypeEnum,
  };

  try {
    await client.query<getDetailPageType, getDetailPageVariables>({
      query: getDetailPage,
      variables,
    });
  } catch (e) {
    // error would be handled in useApollo
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'carousels'])),
      initialApolloState: client.cache.extract(),
      variables,
    },
  };
};

export default React.memo(Detail);
