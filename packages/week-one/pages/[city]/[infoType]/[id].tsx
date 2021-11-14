import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Breadcrumb } from 'antd';

import Carousels from '../../../components/carousels';
import type {
  getDetailPage as getDetailPageType,
  getDetailPageVariables,
  InfoTypeEnum,
} from '../../../gqls/types';
import { getDetailPage } from '../../../gqls/detail';
import { carouselsFragment } from '../../../components/carousels/gqls';
import { initializeApollo } from '../../../hooks/useApollo';
import { INFO_TYPES, ZIP_CODES } from '../../../utils/constants';

interface PropsType {
  variables: getDetailPageVariables;
  infoType: typeof INFO_TYPES[number];
}

const { Item } = Breadcrumb;

const Detail = ({ variables, infoType }: PropsType) => {
  const { t } = useTranslation();
  const { data } = useQuery<getDetailPageType, getDetailPageVariables>(
    getDetailPage,
    {
      variables,
    },
  );
  const city = ZIP_CODES[data?.info.zipCode || '100'];

  return (
    <>
      <Breadcrumb>
        {[
          {
            key: 'taiwan',
            href: '/',
          },
          {
            key: `cities.${city}`,
            href: `/${city}`,
          },
          {
            key: infoType,
            href: `/${city}/${infoType}`,
          },
          {
            key: data?.info.name || '',
          },
        ].map(({ key, href }: { key: string; href?: string }) => (
          <Item key={key}>
            {!href ? (
              key
            ) : (
              <Link href={href}>
                <a>{t(key)}</a>
              </Link>
            )}
          </Item>
        ))}
      </Breadcrumb>

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
      infoType,
    },
  };
};

export default React.memo(Detail);
