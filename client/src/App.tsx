import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'

import Person from './components/people/People'

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
