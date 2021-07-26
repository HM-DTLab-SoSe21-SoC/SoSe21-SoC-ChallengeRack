/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChallange = /* GraphQL */ `
  mutation CreateChallange(
    $input: CreateChallangeInput!
    $condition: ModelChallangeConditionInput
  ) {
    createChallange(input: $input, condition: $condition) {
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
export const updateChallange = /* GraphQL */ `
  mutation UpdateChallange(
    $input: UpdateChallangeInput!
    $condition: ModelChallangeConditionInput
  ) {
    updateChallange(input: $input, condition: $condition) {
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
export const deleteChallange = /* GraphQL */ `
  mutation DeleteChallange(
    $input: DeleteChallangeInput!
    $condition: ModelChallangeConditionInput
  ) {
    deleteChallange(input: $input, condition: $condition) {
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
