import { gql } from '@apollo/client';

import { carouselsFragment } from '../components/carousels/gqls';

export const getDetailPage = gql`
  query getDetailPage($id: ID!, $infoType: InfoTypeEnum!) {
    ...carouselsFragment
    info(id: $id, infoType: $infoType)
      @rest(
        type: "[Info]"
        path: "/Tourism/{args.infoType}?$top=1&$filter=id eq {args.id}&$format=JSON"
      ) {
      id: ID
    }
  }

  ${carouselsFragment}
`;
