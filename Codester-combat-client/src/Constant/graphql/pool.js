import {gql} from '@apollo/client';

// QUERY
export const GET_POOL = gql`
query Query {
    poolOne {
      rank {
        name
        _id
      }
      _id
      users {
        name
        rank {
          name
          _id
        }
        points
        _id
      }
    }
  }
`;

export const UPDATE_POOL = gql`
mutation Mutation($id: String, $user: String, $poolUpdateByIdId2: MongoID!, $poolUpdateByIdUser2: String, $record: UpdateByIdPoolInput!) {
    poolUpdateById(_id: $poolUpdateByIdId2, user: $poolUpdateByIdUser2, record: $record) {
      record {
        users {
          name
          rank {
            name
            _id
          }
          points
          _id
        }
      }
    }
  }
  
`
