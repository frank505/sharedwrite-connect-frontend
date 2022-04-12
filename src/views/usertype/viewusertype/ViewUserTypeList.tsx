import React from 'react';
import { convertTimeStampToCurrentDateTime } from '../../../helpers/helperFunc';
import { ViewUserTypeListType } from './types';



export const ViewUserTypeList:React.FC<ViewUserTypeListType> = ({responseData,fileUrl,editContent,deleteContent}) =>
{



  return (
    <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>type</th>
        <th>type Icon/Image</th>
        <th>created at</th>
        <th>edit</th>
        <th>delete</th>
      </tr>
    </thead>
    <tbody>
      {
        responseData.map((user)=>(

          <tr key={user.id}>
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
               <button className='btn btn-primary' onClick={()=>editContent((user.id) )   }>
                 Edit
               </button>
             </td>
             <td>
             <button className='btn btn-danger' onClick={()=>deleteContent(user.id) }>Delete</button>
             </td>
          </tr>

        ))
      }
    </tbody>
  </table>

  );
}
