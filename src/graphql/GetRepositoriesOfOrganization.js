import { gql } from 'apollo-boost';

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  fragment repository on Repository {
    name
    url
  }

  query ($organization: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
