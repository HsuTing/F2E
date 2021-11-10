import { useMemo } from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';
import { notification } from 'antd';
import merge from 'deepmerge';
import jsSHA from 'jssha';

let apolloClientCache: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      new RetryLink({
        attempts: {
          retryIf: error => Boolean(error) && error.statusCode !== 401,
        },
      }),
      onError(({ graphQLErrors, networkError }) => {
        const errorLog =
          typeof window === 'undefined'
            ? console.error
            : ({ name, ...message }: { name: string }) =>
                notification.error({
                  message: `${name} Error!`,
                  description: JSON.stringify(message),
                });

        if (graphQLErrors)
          graphQLErrors.forEach(graphQLError => {
            errorLog({
              ...graphQLError,
              name: 'GraphQL',
            });
          });

        console.log(networkError);
        if (networkError)
          errorLog({
            ...networkError,
            name: 'Network',
          });
      }),
      new ApolloLink((operation, forward) => {
        const date = new Date().toUTCString();
        const sha = new jsSHA('SHA-1', 'TEXT');

        sha.setHMACKey(process.env.APP_KEY || '', 'TEXT');
        sha.update(`x-date: ${date}`);
        operation.setContext(
          ({ headers }: { headers: { [key: string]: string } }) => ({
            headers: {
              ...headers,
              Authorization: `hmac username="${
                process.env.APP_ID
              }", algorithm="hmac-sha1", headers="x-date", signature="${sha.getHMAC(
                'B64',
              )}"`,
              'X-Date': date,
            },
          }),
        );

        return forward(operation);
      }),
      new RestLink({
        uri: 'https://ptx.transportdata.tw/MOTC/v2/',
        headers: {
          'Accept-Encoding': 'gzip',
          algorithm: 'hmac-sha1',
        },
      }),
    ]),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null,
) => {
  const apolloClient = apolloClientCache ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClient.extract();
    const data = merge(initialState, existingCache);

    apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return apolloClient;

  if (!apolloClientCache) apolloClientCache = apolloClient;

  return apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
