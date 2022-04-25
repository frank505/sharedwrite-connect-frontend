export type ViewUserTypeListDataType =
{
 id:number|string,
 type:string,
 type_icon:string,
 created_at:string,
 updated_at:string
}


export type PagerParams = {
  first_page:number,
  last_page:number,
  current_page:number,
  per_page:number
}

export type PagerViewUserType =
{
 first_page:number,
 last_page:number,
 current_page:number,
 per_page:number,
 total:number,
 data:Array<ViewUserTypeListDataType>
}

export type ResponseDataPramsType = {
  success:boolean,
  message:string,
  file_url:string,
  data:PagerViewUserType
}

export type IViewUserResponseType =
{
  getUserTypeList:ResponseDataPramsType
}

export type ViewUserTypeListType = {
  fileUrl:string,
  responseData?:Array<ViewUserTypeListDataType>,
  activePage:number,
  itemsCountPerPage:number
   totalItemsCount:number
  loadPageItem:(pageNumber:number) => void
}
