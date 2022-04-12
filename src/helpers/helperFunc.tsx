import { exit } from "process";
import React, { SetStateAction, useState } from "react";
import * as swal from  'sweetalert2';
import { ConvertTimeStampToCurrentDateTimeType } from "./types";


export const  useFormFields = (initialState:any) => {
  const [fields, setValues] = useState<any>(initialState);


  return [
    fields,
    setValues,
  function(event:React.ChangeEvent<HTMLInputElement>) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}






export const validateObject = (dataObject:any)=>
   {
    for(var objects in dataObject)
    {

      // console.log('this is the dataObject oooo ss'+dataObject[objects]+' sss');
      /**
       * if  an empty field exist then disable submit button
       */
     if(dataObject[objects]!="" )
     {
        return true;
     }


    }
   /**
    * all forms fields have been submited then we return false and set disable property to true
    */
     return false;
   }




   export const SwalAlert = (title:string,text:string,icon:any) =>
   {
     return swal.default.fire({
      title: title,
     text: text,
     icon: icon,
     });


   }



   export const convertTimeStampToCurrentDateTime = (timeStamp:number):ConvertTimeStampToCurrentDateTimeType =>
   {
     let date = new Date(timeStamp);

     return {
       date:date.getDate(),
       day:date.getDay(),
       month:date.getMonth(),
       year:date.getFullYear(),
       hours:date.getHours(),
       minute:date.getMinutes(),
       seconds:date.getSeconds()
     }
   }
