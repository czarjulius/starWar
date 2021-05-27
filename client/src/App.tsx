import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
// import { onError } from '@apollo/client/link/error'

import Person from './components/people/People'

// const errorLink = onError(({ graphqlErrors, networkError}) =>{
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path}) =>{
//       alert(`Graphql error ${message}`)
//     })
//   }
// })

const link = createHttpLink({
  uri:  `${process.env.REACT_APP_BASE_URL}`
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Person />
    </ApolloProvider>
  );
}

export default App;
