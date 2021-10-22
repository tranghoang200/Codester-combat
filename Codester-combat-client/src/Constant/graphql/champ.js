import {gql} from '@apollo/client';

// QUERY
export const GET_CHAMPS = gql`
  query Query {
    champMany {
      name
      skill1
      skill2
      heal
      shield
      _id
    }
  }
`;

export const GET_CHAMP_BY_ID = gql`
query Query($id: MongoID!) {
  champById(_id: $id) {
    name
    skill1
    skill2
    heal
    shield
    _id
  }
}
`;
