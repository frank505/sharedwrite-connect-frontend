import React from 'react';
import { convertTimeStampToCurrentDateTime } from '../../../helpers/helperFunc';
import { ViewUserTypeListType } from './types';
import Pagination from "react-js-pagination";


export const ViewUserTypeList:React.FC<ViewUserTypeListType> = (
  {responseData,fileUrl,
   activePage,itemsCountPerPage,
    totalItemsCount,loadPageItem}
  ) =>
{



  const editContent = (id:number|string) =>
  {

  }

  const deleteContent = (id:number|string) =>
  {

  }

  return (


  <>

  <table className="table table-bordered table-striped" data-testid='table-content-viewuser'>
    <thead>
      <tr>
        <th>type</th>
        <th>type Icon/Image</th>
        <th>created at</th>
        <th>edit</th>
        <th>delete</th>
      </tr>
    </thead>
    <tbody data-testid='tbody-data'>
      {
        responseData?.map((user)=>(

          <tr key={user.id} className='single-row-data'>
             <td>{user.type}</td>
             <td>
               <img  src={`${fileUrl}${user.type_icon}`} style={{width:'50px',height:'50px'}} />
             </td>
             <td>
               {
                  ""+convertTimeStampToCurrentDateTime(parseInt(user.created_at)).date+"/"
                  +convertTimeStampToCurrentDateTime(parseInt(user.created_at)).month+"/"
                 +convertTimeStampToCurrentDateTime(parseInt(user.created_at)).year
               }
             </td>
             <td>
               <button className='btn btn-primary'

               onClick={()=>editContent((user.id) ) }
               >
                 Edit
               </button>
             </td>
             <td>
             <button className='btn btn-danger'
             onClick={()=>deleteContent(user.id) }
             >Delete</button>
             </td>
          </tr>

        ))
      }
    </tbody>
  </table>

  <div style={{marginLeft:10}}>
                <Pagination
                data-testid='hello-pager'
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
           onChange={loadPageItem}
           itemClass="page-item"
           linkClass="page-link"
            />
            </div>

  </>

  );
}
