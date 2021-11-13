import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloClientOptions,
} from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";

const BASE_URL:string  = 'http://localhost:4000/graphql'

const errorLink = onError((err:ErrorResponse) => {
  if (err.graphQLErrors) {
    err.graphQLErrors.map(({message,locations,path}) =>
    {
      console.log(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: BASE_URL}),
]);

export const client:ApolloClient<any>   = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});



