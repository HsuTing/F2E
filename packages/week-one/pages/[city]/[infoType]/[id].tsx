import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import Info from '../../../components/Info';
import Carousels from '../../../components/carousels';
import type {
  getDetailPage as getDetailPageType,
  getDetailPageVariables,
  InfoTypeEnum,
} from '../../../gqls/types';
import { getDetailPage } from '../../../gqls/detail';
import { infoFragment } from '../../../components/gqls/info';
import { carouselsFragment } from '../../../components/carousels/gqls';
import { initializeApollo } from '../../../hooks/useApollo';
import { INFO_TYPES } from '../../../utils/constants';

interface PropsType {
  variables: getDetailPageVariables;
  infoType: typeof INFO_TYPES[number];
}

const Detail = ({ variables, infoType }: PropsType) => {
  const { data } = useQuery<getDetailPageType, getDetailPageVariables>(
    getDetailPage,
    {
      variables,
    },
  );
  const info = data?.info;

  if (!info) return null;

  return (
    <>
      <Info infoType={infoType} info={filter(infoFragment, info)} />

      <Carousels {...filter(carouselsFragment, data || {})} />
    </>
  );
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
    const { data } = await client.query<
      getDetailPageType,
      getDetailPageVariables
    >({
      query: getDetailPage,
      variables,
    });

    if (!data?.info?.id)
      return {
        notFound: true,
      };
  } catch (e) {
    // error would be handled in useApollo
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'carousels',
        'info',
      ])),
      initialApolloState: client.cache.extract(),
      variables,
      infoType,
    },
  };
};

export default React.memo(Detail);
