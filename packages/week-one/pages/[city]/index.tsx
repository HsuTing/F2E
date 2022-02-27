import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import CityComponent from '../../components/city';
import type { PropsType as CityPropsType } from '../../components/city';
import Carousels from '../../components/carousels';
import type { getCityPage as getCityPageType } from '../../gqls/types';
import { getCityPage } from '../../gqls/city';
import { carouselsFragment } from '../../components/carousels/gqls';
import { initializeApollo } from '../../hooks/useApollo';
import { CITIES } from '../../utils/constants';

interface PropsType extends CityPropsType {}

const City = ({ city }: PropsType) => {
  const { data } = useQuery<getCityPageType>(getCityPage);

  return (
    <>
      <CityComponent city={city} />

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

  try {
    await client.query<getCityPageType>({
      query: getCityPage,
    });
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
      city,
    },
  };
};

export default React.memo(City);
