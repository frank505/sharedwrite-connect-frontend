import { validateObject } from "../../helpers/helperFunc";



export const validate = (values:any):any =>
{
 const errors:any = {};
errors.code = values.code == ''? 'Code field is required':'';
 errors.password =  values.password == ''? 'Password Field is Required': '';
 errors.confirm = values.confirm == ''? 'Confirm Field is Required':'';
 errors.confirm  = values.confirm != values.password? 'Password and confirm do not match':'';

 const validateObj = validateObject(errors);

 return validateObj == false? true: errors;

}
