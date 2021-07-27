/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallange = /* GraphQL */ `
  query GetChallange($id: ID!) {
    getChallange(id: $id) {
      type
      id
      phase
      status
      orgaTitle
      orgaCity
      title
      score
      theme
      technology
      timestamp
      createdAt
      updatedAt
      owner
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
        phase
        status
        orgaTitle
        orgaCity
        title
        score
        theme
        technology
        timestamp
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
