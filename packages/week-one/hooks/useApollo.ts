import { useMemo } from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { RestLink } from 'apollo-link-rest';
import isEmpty from 'fbjs/lib/isEmpty';
import lowerFirst from 'lodash.lowerfirst';

import errorLink from '../utils/errorLink';
import headerLink from '../utils/headerLink';

interface DataType {
  id?: string;
  name?: string;
  date?: string;
  url?: string;
  pictures?: string[];
}

type formatDataType = DataType | DataType[] | DataType[keyof DataType];

let apolloClientCache: ApolloClient<NormalizedCacheObject> | null = null;

const KEYS: { [key: string]: keyof DataType } = {
  ScenicSpotID: 'id',
  RestaurantID: 'id',
  HotelID: 'id',
  ActivityID: 'id',
  ScenicSpotName: 'name',
  RestaurantName: 'name',
  HotelName: 'name',
  ActivityName: 'name',
  OpenTime: 'date',
  Picture: 'pictures',
};

const format = (data: formatDataType): formatDataType => {
  if (data instanceof Array) return data.map(format) as DataType[];

  if (data && typeof data === 'object')
    return 'PictureUrl1' in data
      ? [1, 2, 3]
          .map(key => ({
            url: data[`PictureUrl${key}`],
          }))
          .filter(({ url }) => url)
      : Object.entries(data).reduce(
          (result, [key, value]) => ({
            ...result,
            [KEYS[key] || lowerFirst(key)]: (() => {
              if (isEmpty(value)) return key !== 'Picture' ? null : [];

              return format(value);
            })(),
          }),
          {},
        );

  return data;
};

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      new RetryLink({
        attempts: {
          retryIf: error => Boolean(error) && error.statusCode !== 401,
        },
      }),
      errorLink,
      headerLink,
      new RestLink({
        uri: 'https://ptx.transportdata.tw/MOTC/v2',
        headers: {
          'Accept-Encoding': 'gzip',
          algorithm: 'hmac-sha1',
        },
        responseTransformer: async response => format(await response.json()),
        endpoints: {
          single: {
            uri: 'https://ptx.transportdata.tw/MOTC/v2',
            responseTransformer: async response =>
              format((await response.json())[0] || null),
          },
        },
      }),
    ]),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null,
) => {
  const apolloClient = apolloClientCache ?? createApolloClient();

  if (initialState) apolloClient.cache.restore(initialState);

  if (typeof window === 'undefined') return apolloClient;

  if (!apolloClientCache) apolloClientCache = apolloClient;

  return apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
