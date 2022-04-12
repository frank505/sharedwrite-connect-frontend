import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CTable
} from '@coreui/react'
import { useLazyQuery } from '@apollo/client'
import { GET_USER_TYPE_LIST } from '../../../Graphql/Query/UserType'
import { IViewUserResponseType, PagerParams, ViewUserTypeListDataType } from './types'
import Pagination from "react-js-pagination";
import "bootstrap/scss/bootstrap.scss";
import { ViewUserTypeList } from './ViewUserTypeList';
import { ThreeDots } from 'react-loader-spinner'
import { ConvertTimeStampToCurrentDateTimeType } from '../../../helpers/types'




const  ViewUserType:React.FC<{}> = () =>
{




  const [responseData,setResponseData] = useState<Array<ViewUserTypeListDataType>>([]);
  const [paginationParams,setPaginationParams] = useState<any>(null);
  const [fileUrl,setFileUrl] = useState<string>('');
  const perPage = '10';



  useEffect(()=>{
  console.log('we are here oooo');
    getUserTypeList({variables:
      {
      curr_page:'1',
      per_page:perPage
    }
  });

  },[])


  const [getUserTypeList, {data,loading}] = useLazyQuery(GET_USER_TYPE_LIST, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',

   onError: (err) =>
   {
     console.log(err);
   },
   onCompleted:(data:IViewUserResponseType)=>
   {
    console.log(data);
     setFileUrl(data.getUserTypeList.file_url);

     setPaginationParams({
      firstPage:data.getUserTypeList.data.first_page,
      lastPage:data.getUserTypeList.data.last_page,
      currPage:data.getUserTypeList.data.current_page,
      nextPage:data.getUserTypeList.data.current_page + 1,
      total:data.getUserTypeList.data.total
     });

    setResponseData(data.getUserTypeList.data.data);


   }
  });


  const loadPageItem = (pageNumber:number):void =>
  {
    console.log(pageNumber)
   getUserTypeList({
     variables:{
       curr_page:pageNumber+'',
       per_page:perPage
     }
   })
  }



 const editContent = (id:string|number) =>
 {
  console.log(id);
 }

 const deleteContent = (id:number|string) =>
 {
   console.log(id);
 }



  return (
    <div className=" c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
        <CCol xs={12}>
      </CCol>
          <CCol md="12">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {
                  loading ?
                    <ThreeDots
                    color="#321fdb" height={100} width={100}
                    />
                   :
                  <ViewUserTypeList
                  responseData={responseData}
                  fileUrl={fileUrl}
                  editContent={editContent}
                  deleteContent={deleteContent}
                  />
                }

                <div style={{marginLeft:10}}>
                <Pagination
          activePage={paginationParams?.currPage}
          itemsCountPerPage={parseInt(perPage)}
          totalItemsCount={paginationParams==null?0:paginationParams?.total}
          pageRangeDisplayed={5}
           onChange={loadPageItem}
           itemClass="page-item"
           linkClass="page-link"
            />
            </div>

                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ViewUserType;
