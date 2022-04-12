import { gql } from "@apollo/client";

export const GET_USER_TYPE_LIST = gql`
  query getUserTypeList(
    $per_page: String!
    $curr_page: String!
  ) {
    getUserTypeList(
      per_page: $per_page
      curr_page: $curr_page
    ){
      success,
      data
      {first_page,last_page,total,
        per_page,current_page,
      data {
        id,type,type_icon,created_at,updated_at
      }
      }
      ,message,file_url
    }
  }
`;
