import {  validate } from "./CreateUserTypeValidation";
import { ICreateUserTypeValues } from './types';



describe('Create user type validation', ()=>
{
  it('validates form input and returns no error', ()=>{
     const values:any = {
         type:'doctor',
       type_icon:'nnamdi.png'
     }

     const validateRes = validate(values);
     expect(validateRes).toBe(true);

  });


  it('returns error object', ()=>
  {
    const values:any = {
      type:'',
      type_icon:''
    }

    const validateRes = validate(values);
    expect(validateRes.type).not.toBe('');
    expect(validateRes.type_icon).not.toBe('');
  })

})
