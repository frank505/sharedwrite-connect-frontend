import { validateObject } from '../../helpers/helperFunc'

export const validate = (values: any): any => {
  const errors: any = {}
  errors.code = values.code == '' ? 'Passcode Field is Required' : '';
  errors.code = values.code.length < 6 ? 'Passcode must be at least 6 characters' : '';
  errors.code = values.code.length > 6 ? 'Passcode must be less than 6 characters' : '';
  errors.code = !/^(?=.*[0-9])(?=.{6,})/.test(values.code)
    ? 'Passcode must contain at least one number'
    : '';
  const validateObj = validateObject(errors)
  return validateObj == false ? true : errors
}
