import {validate} from './ForgotPasswordValidation';

describe('Name of the group', () => {

it('validates form input', ()=>
{
    const values = {email:'akpufranklin2@gmail.com'}
    const validateRes = validate(values);
    expect(validateRes).toBe(true);
});

it('returns error object',()=>
{
    const values = {email:''}
    const validateRes = validate(values);
    expect(validateRes.email).not.toBe('');;
})

});
