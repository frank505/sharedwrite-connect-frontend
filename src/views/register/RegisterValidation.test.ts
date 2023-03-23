import { validate } from './RegisterValidation'

describe('Name of the group', () => {
  it('validates form input', () => {
    const values = {
      email: 'akpufranklin2@gmail.com',
      password: 'password',
      first_name: 'desmond',
      last_name: 'akpu',
    }
    const validateRes = validate(values)
    expect(validateRes).toBe(true)
  })

  it('returns error object', () => {
    const values = { email: '', password: '' }
    const validateRes = validate(values)
    expect(validateRes.email).not.toBe('')
    expect(validateRes.password).not.toBe('')
  })
})
