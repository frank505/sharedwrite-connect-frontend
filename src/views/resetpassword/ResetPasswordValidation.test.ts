import { validate } from './ResetPasswordValidation'

describe('Name of the group', () => {
  it('validates form input', () => {
    const values = { password: 'password', confirm: 'password', code: '22222' }
    const validateRes = validate(values)
    expect(validateRes).toBe(true)
  })

  it('returns error object', () => {
    /**
     * if all fields are empty
     */
    const values = { password: '', code: '', confirm: '' }
    const validateRes = validate(values)
    expect(validateRes.password).not.toBe('')
    expect(validateRes.code).not.toBe('')

    /**
     * if password and confirm do not match
     */
    const valuesPaswordConfirmNotMatch = { password: 'password', confirm: 'confirm', code: '2211' }
    const validateResSecond = validate(valuesPaswordConfirmNotMatch)
    expect(validateResSecond.code).toBe('')
    expect(validateResSecond.password).toBe('')
    expect(validateResSecond.confirm).not.toBe('')
  })
})
