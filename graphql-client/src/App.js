import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from './DisplayData';

function App() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    uri: "http://localhost:5000/graphql"
  })
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List of users</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
 