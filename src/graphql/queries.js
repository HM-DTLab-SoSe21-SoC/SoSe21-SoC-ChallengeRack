/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallange = /* GraphQL */ `
  query GetChallange($id: ID!) {
    getChallange(id: $id) {
      type
      id
      content
      owner
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const listChallanges = /* GraphQL */ `
  query ListChallanges(
    $filter: ModelChallangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallanges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        content
        owner
        timestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
