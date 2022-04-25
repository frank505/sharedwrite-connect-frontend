import { validateObject, useFormFields, SwalAlert } from "./helperFunc";
import { renderHook, act } from '@testing-library/react-hooks' ;
import { waitFor } from "@testing-library/dom";
import * as swal from 'sweetalert2';
import * as helpers from './helperFunc';




jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))




describe('Name of the group', () => {

    it('button is set to disable', ()=>
    {
        let data =
        {
            name:"",
            email:""
        }

      let disableRes = validateObject(data);
      console.log(disableRes);
      expect(disableRes).toBe(false);

      data ={
        name:'henry',
        email:'d'
      }

      let disable = validateObject(data);
      console.log(disable);
      expect(disable).toBe(true);
    });

  it('test useformfields',()=>
  {
 const {result} = renderHook(()=> useFormFields({name:'desmond',email:''}));
 expect(result.current[0].name).toBe('desmond');
  });

  it('calls swal alert ', async()=>
  {
    let swalAlertBe:any = swal.default;
    SwalAlert("dd",'ddd','ddd');
    expect(swal.default.fire).toHaveBeenCalled();
  });

  it('test our helper func', () =>
  {
    let date = new Date();
    let timeConvert = date.getTime();
   let res = helpers.convertTimeStampToCurrentDateTime(timeConvert);
   expect(res).toHaveProperty('month',date.getMonth());
  });

});
