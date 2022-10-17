import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import { GET_REPOSITORIES_OF_ORGANIZATION } from './graphql/GetRepositoriesOfOrganization';

import 'dotenv/config';
import { ADD_STAR } from './graphql/AddStarForRepository';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
});

const main = async () => {
  const result = await client.query({
    query: GET_REPOSITORIES_OF_ORGANIZATION,
    variables: {
      organization: 'the-road-to-learn-react',
    },
  });

  console.log(JSON.stringify(result, undefined, 2));

  client
    .query({
      query: GET_REPOSITORIES_OF_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
        cursor:
          result.data.organization.repositories.pageInfo.endCursor,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    });

  client
    .mutate({
      mutation: ADD_STAR,
      variables: {
        repositoryId: 'MDEwOlJlcG9zaXRvcnkxMDY3ODI4NzM=',
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    });
};

main();
