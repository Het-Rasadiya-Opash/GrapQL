import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: import.meta.env.VITE_GRAPHQL_SERVER }),
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient} >
      <App />
    </ApolloProvider>
  </StrictMode>,
)
