import { gql } from '@apollo/client';

export const infoCarouselFragment = gql`
  fragment infoCarouselFragment on Picture {
    url
  }
`;
