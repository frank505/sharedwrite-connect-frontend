import { JWT_TOKEN_KEY } from './../constants';
import  Cookies  from 'js-cookie';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloClientOptions,
  ApolloLink,
  concat
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const BASE_URL:string  = 'http://localhost:4000/graphql'

let token = Cookies.get(JWT_TOKEN_KEY);

const uploadLink = createUploadLink({
  uri: BASE_URL,
  headers:{
    authorization: token==null || token == undefined?null:`Bearer ${token}` ,
  }
});





export const client:ApolloClient<any>   = new ApolloClient({
  cache: new InMemoryCache(),
   link: uploadLink,
});



