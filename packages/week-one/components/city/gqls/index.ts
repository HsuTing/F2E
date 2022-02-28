import { gql } from '@apollo/client';

export const cityFragment = gql`
  fragment cityFragment on Recommend {
    id
    pictures @type(name: "Picture") {
      url
    }
  }
`;
