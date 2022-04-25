import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from '@coreui/react';
import "bootstrap/scss/bootstrap.scss";
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { useGetUserTypeListQuery } from '../../../Graphql/generated/graphql';
import { dataSource } from '../../../http/ApolloClientProvider';
import { ViewUserTypeListDataType } from './types';
import { ViewUserTypeList } from './ViewUserTypeList';







const  ViewUserType:React.FC<{}> = () =>
{


const history = useHistory();


  const [responseData,setResponseData] = useState<Array<ViewUserTypeListDataType>>([]);
  const [paginationParams,setPaginationParams] = useState<any>(null);
  const [fileUrl,setFileUrl] = useState<string>('');
  const perPage = '2';
  const [currentPage,setCurrPage] = useState('1');

  const setHeaderParams = dataSource();



  const {isSuccess,isError,isLoading,data,refetch} = useGetUserTypeListQuery(
   setHeaderParams, {per_page:perPage,curr_page:currentPage},{cacheTime:0});





useEffect(()=>{



  if(isSuccess)
  {
    setFileUrl(data?.getUserTypeList?.file_url as string);

     setPaginationParams({
      firstPage:data?.getUserTypeList?.data?.first_page as number,
      lastPage:data?.getUserTypeList?.data?.last_page,
      currPage:data?.getUserTypeList?.data?.current_page,
      nextPage:data?.getUserTypeList?.data?.current_page as number + 1,
      total:data?.getUserTypeList?.data?.total
     });
    setResponseData(data?.getUserTypeList?.data?.data as any);

  }


},[isLoading])



useEffect(()=>{

refetch();

},[currentPage])


  const loadPageItem = (pageNumber:number):void =>
  {
   setCurrPage(pageNumber.toString());
  }



 const editContent = (id:string|number) =>
 {

 }

 const deleteContent = (id:number|string) =>
 {

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
                  isLoading ?

                  <ThreeDots
                    data-testid="loading-data-view-user-type"
                    color="#321fdb" height={100} width={100}
                    />
                   :

                        <ViewUserTypeList
                  responseData={responseData}
                  fileUrl={fileUrl}
                  activePage={paginationParams?.currPage}
                  itemsCountPerPage={parseInt(perPage)}
                   totalItemsCount={paginationParams==null?0:paginationParams?.total}
                  loadPageItem={loadPageItem}
                  />

                }



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
