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
export const listPostsSortedByTimestamp = /* GraphQL */ `
  query ListPostsSortedByTimestamp(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChallangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByTimestamp(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const listPostsBySpecificOwner = /* GraphQL */ `
  query ListPostsBySpecificOwner(
    $owner: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChallangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsBySpecificOwner(
      owner: $owner
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
