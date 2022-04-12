import { ICreateUserTypeValues } from './types';
import { validateObject } from "../../../helpers/helperFunc";




export const validate = (values:ICreateUserTypeValues) =>
{

   const extension:Array<any> = ['png','jpeg','jpg','png','png'];
   const fileExt:string|undefined = values.type_icon.split('.').pop();
   const errors:any = {};

   errors.user_type = values.type == '' ? 'User Type Field is required':'';
   errors.type_icon = !extension.includes(fileExt?.toLocaleLowerCase()) ? 'File uploaded must be a png,jpeg or jpg':'';

   const validateObj = validateObject(errors);
   return validateObj == false?true:errors;

}
