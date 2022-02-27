import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import InfoComponent from '../../../components/info';
import type { PropsType as InfoPropsType } from '../../../components/info';
import Carousels from '../../../components/carousels';
import type {
  getInfoPage as getInfoPageType,
  getInfoPageVariables,
  InfoTypeEnum,
} from '../../../gqls/types';
import { getInfoPage } from '../../../gqls/info';
import { infoFragment } from '../../../components/info/gqls';
import { carouselsFragment } from '../../../components/carousels/gqls';
import { initializeApollo } from '../../../hooks/useApollo';
import { CITIES, INFO_TYPES } from '../../../utils/constants';

interface PropsType extends Omit<InfoPropsType, 'info'> {
  variables: getInfoPageVariables;
}

const Info = ({ variables, city, infoType }: PropsType) => {
  const { data } = useQuery<getInfoPageType, getInfoPageVariables>(
    getInfoPage,
    {
      variables,
    },
  );
  const info = data?.info;

  if (!info) return null;

  return (
    <>
      <InfoComponent
        city={city}
        infoType={infoType}
        info={filter(infoFragment, info)}
      />

      <Carousels {...filter(carouselsFragment, data || {})} />
    </>
  );
};

export const getServerSideProps = async ({
  locale,
  query: { city, infoType, id },
}: {
  locale: string;
  query: Omit<PropsType, 'variables'> & {
    id: string;
  };
}) => {
  if (!CITIES.includes(city) || !INFO_TYPES.includes(infoType))
    return { notFound: true };

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
    const { data } = await client.query<getInfoPageType, getInfoPageVariables>({
      query: getInfoPage,
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
      city,
      infoType,
    },
  };
};

export default React.memo(Info);
