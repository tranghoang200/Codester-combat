import {gql} from '@apollo/client';

// QUERY
export const GET_GAME = gql`
query Query {
    gameOne {
      player1
      player2
      rank {
          name
          _id
      }
      problems
      winner
      _id
    }
  }
`;

// Mutation
export const CREATE_GAME = gql`
mutation Mutation($record: CreateOneGameInput!) {
    gameCreateOne(record: $record) {
      recordId
      record {
        player1
        player2
        rank {
            name
            _id
        }
        problems
        winner
      }
    }
  }
`;
