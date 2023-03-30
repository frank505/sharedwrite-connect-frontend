import { validateObject } from '../../helpers/helperFunc'

export const validate = (values: any): any => {
  const errors: any = {}
  errors.passcode = values.passcode == '' ? 'Passcode Field is Required' : '';
  errors.passcode = values.passcode.length < 6 ? 'Passcode must be at least 6 characters' : '';
  errors.passcode = values.passcode.length > 6 ? 'Passcode must be less than 6 characters' : '';
  errors.passcode = !/^(?=.*[0-9])(?=.{6,})/.test(values.passcode)
    ? 'Passcode must contain at least one number'
    : '';
  const validateObj = validateObject(errors)
  return validateObj == false ? true : errors
}
