/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      phase
      status
      coName
      coTitle
      coEmail
      coPhone
      coOptIn
      orgaTitle
      orgaLocat
      orgaMission
      orgaWebsite
      orgaDate
      chaStatem
      chaDes
      chaStak
      chaBac
      chaSup
      leadSup
      critOfSuc
      nextStep
      publCheck
      chatitle
      theme
      technology
      repu
      feasibil
      impact
      scalabil
      aligment
      prototype
      score
      type
      comment
      faculty
      prof
      matchEmail
      numberOfT
      numberOfS
      startDate
      endDate
      cohort
      milestone
      publURL
      gitHubURL
      publDate
      image
      timestamp
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phase
        status
        coName
        coTitle
        coEmail
        coPhone
        coOptIn
        orgaTitle
        orgaLocat
        orgaMission
        orgaWebsite
        orgaDate
        chaStatem
        chaDes
        chaStak
        chaBac
        chaSup
        leadSup
        critOfSuc
        nextStep
        publCheck
        chatitle
        theme
        technology
        repu
        feasibil
        impact
        scalabil
        aligment
        prototype
        score
        type
        comment
        faculty
        prof
        matchEmail
        numberOfT
        numberOfS
        startDate
        endDate
        cohort
        milestone
        publURL
        gitHubURL
        publDate
        image
        timestamp
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listBySpecificID = /* GraphQL */ `
  query ListBySpecificID(
    $id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBySpecificID(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phase
        status
        coName
        coTitle
        coEmail
        coPhone
        coOptIn
        orgaTitle
        orgaLocat
        orgaMission
        orgaWebsite
        orgaDate
        chaStatem
        chaDes
        chaStak
        chaBac
        chaSup
        leadSup
        critOfSuc
        nextStep
        publCheck
        chatitle
        theme
        technology
        repu
        feasibil
        impact
        scalabil
        aligment
        prototype
        score
        type
        comment
        faculty
        prof
        matchEmail
        numberOfT
        numberOfS
        startDate
        endDate
        cohort
        milestone
        publURL
        gitHubURL
        publDate
        image
        timestamp
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
