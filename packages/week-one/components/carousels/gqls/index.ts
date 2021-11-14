import { gql } from '@apollo/client';

import { carouselFragment } from './carousel';

export const carouselsFragment = gql`
  fragment carouselsFragment on Query {
    scenicSpots: infos(infoType: ScenicSpot, first: 15)
      @rest(
        type: "[Info]"
        path: "/Tourism/{args.infoType}?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }

    hotels: infos(infoType: Hotel, first: 15)
      @rest(
        type: "[Info]"
        path: "/Tourism/{args.infoType}?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }

    activities: infos(infoType: Activity, first: 15)
      @rest(
        type: "[Info]"
        path: "/Tourism/{args.infoType}?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }
  }

  ${carouselFragment}
`;
