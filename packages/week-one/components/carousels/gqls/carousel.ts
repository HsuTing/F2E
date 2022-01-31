import { gql } from '@apollo/client';

export const carouselFragment = gql`
  fragment carouselFragment on Info {
    id
    name
    picture @type(name: "Picture") {
      url: pictureUrl1
    }
    address
    date: openTime
    zipCode
  }
`;
