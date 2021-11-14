import { gql } from '@apollo/client';

export const carouselsFragment = gql`
  fragment carouselsFragment on Query {
    scenicSpots(first: 15)
      @rest(
        type: "[ScenicSpot]"
        path: "/Tourism/ScenicSpot?$top={args.first}&$format=JSON"
      ) {
      id: ID
      picture: Picture @type(name: "Picture") {
        url: PictureUrl1
      }
    }

    hotels(first: 15)
      @rest(
        type: "[Hotel]"
        path: "/Tourism/Hotel?$top={args.first}&$format=JSON"
      ) {
      id: ID
      picture: Picture @type(name: "Picture") {
        url: PictureUrl1
      }
    }

    activities(first: 15)
      @rest(
        type: "[Activity]"
        path: "/Tourism/Activity?$top={args.first}&$format=JSON"
      ) {
      id: ID
      picture: Picture @type(name: "Picture") {
        url: PictureUrl1
      }
    }
  }
`;
