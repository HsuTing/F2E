import { ApolloLink } from '@apollo/client';
import jsSHA from 'jssha';

export default new ApolloLink((operation, forward) => {
  const date = new Date().toUTCString();
  const sha = new jsSHA('SHA-1', 'TEXT');

  sha.setHMACKey(process.env.NEXT_PUBLIC_APP_KEY || '', 'TEXT');
  sha.update(`x-date: ${date}`);
  operation.setContext(
    ({ headers }: { headers: { [key: string]: string } }) => ({
      headers: {
        ...headers,
        Authorization: [
          `hmac username="${process.env.NEXT_PUBLIC_APP_ID}"`,
          'algorithm="hmac-sha1"',
          'headers="x-date"',
          `signature="${sha.getHMAC('B64')}"`,
        ].join(', '),
        'X-Date': date,
      },
    }),
  );

  return forward(operation);
});
