import { validateObject } from '../../helpers/helperFunc'

export const validate = (values: any): any => {
  const errors: any = {}
  errors.first_name = values.first_name == '' ? 'First Name Field is Required' : ''
  errors.last_name = values.last_name == '' ? 'Last Name Field is Required' : ''
  errors.email = values.email == '' ? 'Email Field is Required' : ''
  errors.email = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ? 'Invalid email address'
    : ''
  errors.password = values.password == '' ? 'Password Field is Required' : ''
  errors.password = values.password.length < 6 ? 'Password must be at least 6 characters' : ''
  errors.password = values.password.length > 20 ? 'Password must be less than 20 characters' : ''
  errors.password = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(values.password)
    ? 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    : ''
  errors.confirm_password =
    values.confirm_password == '' ? 'Confirm Password Field is Required' : ''
  errors.confirm_password =
    values.confirm_password !== values.password ? 'Passwords do not match' : ''

  const validateObj = validateObject(errors)

  return validateObj == false ? true : errors
}
