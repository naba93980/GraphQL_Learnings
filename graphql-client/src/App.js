import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    uri: "http://localhost:5000/graphql"
  })
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>hello world</p>
      </div>
    </ApolloProvider>

  );
}

export default App;
