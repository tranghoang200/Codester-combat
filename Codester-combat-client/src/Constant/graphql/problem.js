import {gql} from '@apollo/client';

// QUERY
export const GET_All_PROBLEMS = gql`
query Query {
    problemMany {
      content
      rank {
        name
        _id
    }
      testCase {
        input
        output
      }
      _id
    }
  }
`;

export const GET_All_PROBLEMS_ID = gql`
query Query {
    problemMany {
      _id
    }
  }
`;

export const GET_PROBLEM_ID = gql`
query Query($id: MongoID!) {
    problemById(_id: $id) {
      content
      rank {
        name
        _id
    }
      testCase {
        input
        output
      }
      _id
    }
  }
`;