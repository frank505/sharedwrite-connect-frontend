import { gql } from "@apollo/client";

export const CREATE_USER_TYPE = gql`
  mutation createUserType(
    $type: String!
    $type_icon: Uploads!
  ) {
    createUserType(
      type: $type
      type_icon: $type_icon
    ) {
       success,message,errorStatus,error,token
    }
  }
`;
