import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import CityComponent from '../../components/city';
import type { PropsType as CityPropsType } from '../../components/city';
import Carousels from '../../components/carousels';
import type {
  getCityPage as getCityPageType,
  getCityPageVariables,
} from '../../gqls/types';
import { getCityPage } from '../../gqls/city';
import { cityFragment } from '../../components/city/gqls';
import { carouselsFragment } from '../../components/carousels/gqls';
import { initializeApollo } from '../../hooks/useApollo';
import { CITIES } from '../../utils/constants';

interface PropsType extends CityPropsType {
  variables: getCityPageVariables;
}

const City = ({ city, variables }: PropsType) => {
  const { data } = useQuery<getCityPageType, getCityPageVariables>(
    getCityPage,
    {
      variables,
    },
  );
  const recommend = data?.recommend;

  if (!recommend) return null;

  return (
    <>
      <CityComponent city={city} recommend={filter(cityFragment, recommend)} />

      <Carousels {...filter(carouselsFragment, data || {})} />
    </>
  );
};

export const getServerSideProps = async ({
  locale,
  query: { city },
}: {
  locale: string;
  query: PropsType;
}) => {
  if (!CITIES.includes(city)) return { notFound: true };

  const client = initializeApollo();
  const variables = {
    city,
  };

  try {
    const { data } = await client.query<getCityPageType, getCityPageVariables>({
      query: getCityPage,
      variables,
    });

    if (!data?.recommend?.id) return { notFound: true };
  } catch (e) {
    // error would be handled in useApollo
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'carousels',
        'city',
      ])),
      initialApolloState: client.cache.extract(),
      variables,
      city,
    },
  };
};

export default React.memo(City);
