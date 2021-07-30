/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallange = /* GraphQL */ `
  query GetChallange($id: ID!) {
    getChallange(id: $id) {
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
    $filter: ModelChallangeFilterInput
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
        timestamp
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
