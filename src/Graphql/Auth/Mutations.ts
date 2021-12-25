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


export const FORGOT_PASSWORD_CODE_ADMIN = gql`
     mutation forgotPasswordAdmin(
     $email: String!
     )
     {
         forgotPasswordAdmin(
          email:$email
         )
         {
          success,email,code,message
         }
     }
`;
