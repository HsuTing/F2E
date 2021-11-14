import { gql } from '@apollo/client';

export const carouselFragment = gql`
  fragment carouselFragment on Info {
    id: ID
    name: Name
    picture: Picture @type(name: "Picture") {
      url: PictureUrl1
    }
    address: Address
    date: OpenTime
  }
`;
