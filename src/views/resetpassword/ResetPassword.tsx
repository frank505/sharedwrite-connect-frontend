import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { FormikValues, useFormik } from 'formik'
import { validate } from './ResetPasswordValidation'
import { useHistory, useLocation } from 'react-router-dom'
import './resetpassword.scss'
// import  {dataSource} from '../../http/ApolloClientProvider';
// import { useAdminChangePasswordMutation } from '../../Graphql/generated/graphql';

export type LocationPropsForResetPassword = {
  state: {
    emailToResetPassword: string
  }
}

const ResetPassword = () => {
  const { state }: LocationPropsForResetPassword = useLocation<any>()

  const history = useHistory()

  const [email, setEmail] = useState<string>('')

  //   const setHeaderParams = dataSource();

  //  const {mutate,isLoading,isError,isSuccess,data,error} = useAdminChangePasswordMutation(setHeaderParams);

  const formik: FormikValues = useFormik({
    initialValues: {
      code: '',
      password: '',
      confirm: '',
      email: state.emailToResetPassword,
    },
    validate,
    onSubmit: (values: any) => {
      // mutate(values);
    },
  })

  const goToLoginPage = (): void => {
    history.push('/login')
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center"
      id="containerResetPassword"
      data-testid="reset-password-root"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-12">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit} data-testid="form-reset-password-container">
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Reset Password</p>

                    {/**hidden field */}
                    <input type="hidden" value={email} />

                    <div
                      className="response responseContentDiv"
                      data-testid="responseResetPasswordDiv"
                    >
                      {
                        //    isLoading ?
                        //    <div className="loading-text">loading.....</div>
                        //    :
                        //  error!==void 0 &&  error?.message ?
                        // <div className="error_form_response">{error?.message}</div>
                        //  :
                        //  null
                      }
                    </div>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-key"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter passcode"
                        id="code"
                        name="code"
                        data-testid="reset-password-code-form"
                        onChange={formik.handleChange}
                        value={formik.values.code}
                      />
                      <div
                        className="error_form_response"
                        data-testid="reset-password-code-validation-response"
                      >
                        {formik.errors.code ? <div>{formik.errors.code}</div> : null}
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-user"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        data-testid="reset-password-password-form"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div
                        className="error_form_response"
                        data-testid="reset-pasword-password-validation-response"
                      >
                        {formik.errors.email ? <div>{formik.errors.password}</div> : null}
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <i className="fa fa-key"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="confirm"
                        name="confirm"
                        data-testid="reset-password-confirm-code-form"
                        placeholder="confirm your password"
                        onChange={formik.handleChange}
                        value={formik.values.confirm}
                      />
                      <div
                        className="error_form_response"
                        data-testid="reset-password-confirm-validation-response"
                      >
                        {formik.errors.confirm ? <div>{formik.errors.confirm}</div> : null}
                      </div>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          type="submit"
                          data-testid="btn-submit-user-form"
                          className="px-4"
                        >
                          Reset Password
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                          data-testid="go-to-login-page"
                          onClick={goToLoginPage}
                        >
                          Login Here?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
