import { gql } from '@apollo/client';

import { carouselsFragment } from '../components/carousels/gqls';
import { infoFragment } from '../components/info/gqls';

export const getDetailPage = gql`
  query getDetailPage($id: ID!, $infoType: InfoTypeEnum!) {
    ...carouselsFragment
    info(id: $id, infoType: $infoType)
      @rest(
        type: "Info"
        endpoint: "single"
        path: "/Tourism/{args.infoType}?$top=1&$filter={args.infoType}ID eq '{args.id}'&$format=JSON"
      ) {
      ...infoFragment
      id
      name
      zipCode
    }
  }

  ${carouselsFragment}
  ${infoFragment}
`;
