import { gql } from '@apollo/client';

export const carouselFragment = gql`
  fragment carouselFragment on Info {
    id
    name
    pictures @type(name: "[Picture]!") {
      url
    }
    address
    date
    zipCode
  }
`;
