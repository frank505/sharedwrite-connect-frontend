import { gql } from "@apollo/client";

export const LOGIN_ADMIN_MUTATION = gql`
  mutation loginAdmin(
    $email: String!
    $password: String!,
  ) {
    loginAdmin(
      email: $email
      password: $password,
    ) {
       success,message,errorStatus,error,token
    }
  }
`;
