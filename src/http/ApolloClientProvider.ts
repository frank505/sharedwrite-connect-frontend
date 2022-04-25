import { JWT_TOKEN_KEY } from '../constants';
import  Cookies  from 'js-cookie';


const BASE_URL:string  = 'http://localhost:4000/graphql';



export type IDataSource = {
  endpoint: string,
  fetchParams?: RequestInit | undefined
}


export const dataSource= ():IDataSource =>{
  return {
        endpoint:BASE_URL,
      fetchParams:{
        headers: {
          'Authorization': `Bearer ${Cookies.get(JWT_TOKEN_KEY)}` ,
          'Content-type': 'application/json',
        }
      }
      }
}

















