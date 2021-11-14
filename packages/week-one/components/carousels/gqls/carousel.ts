import { gql } from '@apollo/client';

export const carouselFragment = gql`
  fragment carouselFragment on Info {
    id: ID
    picture: Picture @type(name: "Picture") {
      url: PictureUrl1
    }
  }
`;
