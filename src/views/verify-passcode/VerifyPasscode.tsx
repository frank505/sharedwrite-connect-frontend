import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
  } from '@coreui/react';
import React, { useState, useEffect } from 'react'
import './verify-passcode.scss';
import PinInput from 'react-pin-input';
import { FormikValues, useFormik } from 'formik'
import Cookies from 'js-cookie'
import { validate } from './VerifyPasscodeValidation'
import { useHistory } from 'react-router-dom'
import { JWT_TOKEN_KEY } from '../../constants'
import logo from '../../assets/images/logo.png'
import { useUserRegisterMutation } from '../../http/ApiSetup'
import {  ThreeDots } from 'react-loader-spinner'
import * as _ from 'lodash'

const VerifyPasscode = () => {
  const history = useHistory()
  const [userRegister, result] = useUserRegisterMutation()
  const [ErrorAlert, setErrorAlert] = useState('')
  const [SuccessAlert, setSuccessAlert] = useState('')

  const formik: FormikValues = useFormik({
    initialValues: {
      passcode: '',
    },
    validate,
    onSubmit: (values: any) => {
      // userRegister(values)
    },
  })

  const goToRegisterPage = (): void => {
    history.push('/register')
  }

  const goToLoginPage = (): void => {
    history.push('/login')
  }

  return (
  <div className="set-background-img min-vh-100 d-flex flex-row align-items-center"
    id="containerVerifyPasscode"
    data-testid="register-root" >
      <CContainer>
        <CRow className="justify-content-center">
          <div style={{ textAlign: 'center' }}>
            <CImage src={logo} className="logo-image" />
          </div>

          <CCol md={8} xl={5} xxl={5} sm={9} xs={9} lg={7}>
            <CCardGroup className="style-card-group">
              <CCard className="p-12 restyle-form-card">
                <CCardBody>
                  <CForm
                    className="add-padding-to-form-card"
                    onSubmit={formik.handleSubmit}
                    data-testid="form-register-container"
                  >
                    <h3 className="auth-header">Verify Passcode</h3>

                    <div
                      className="response responseContentDiv"
                      data-testid="response-register-err-div"
                    >
                      {/* {result.isError && (
                        <CAlert color="danger" data-testid="register-error-response">
                          {ErrorAlert}
                        </CAlert>
                      )}

                      {result.isLoading ?? (
                        <ThreeDots
                          height="50"
                          width="50"
                          radius="9"
                          color="#6c5ffc"
                          ariaLabel="three-dots-loading"
                          wrapperClass="three-dots-loader-style"
                          visible={true}
                        />
                      )} */}
                    </div>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-lock"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter Passcode"
                        id="passcode"
                        name="passcode"
                        data-testid="register-first-name-form"
                        onChange={formik.handleChange}
                        value={formik.values.passcode}
                      />
                      <div
                        className="error_form_response"
                        data-testid="verify-passcode-passcode-validation-response"
                      >
                        {formik.errors.passcode ? <div>{formik.errors.passcode}</div> : null}
                      </div>
                    </CInputGroup>



                    <div className="d-grid">
                      <CButton
                        color="primary"
                        type="submit"
                        className="added-btn-style"
                        disabled={result.isLoading}
                      >
                        Verify
                      </CButton>
                    </div>

                    <CRow>
                      <CCol xs={12} className="links-section-on-auth">
                        <CButton
                          color="link"
                          className="px-0"
                          data-testid="go-to-login-page"
                          onClick={goToLoginPage}
                        >
                          Login
                        </CButton>
                        <span> | </span>
                        <CButton
                          color="link"
                          className="px-0"
                          data-testid="go-to-forgot-password-page"
                          onClick={goToRegisterPage}
                        >
                          Register
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


export default VerifyPasscode;
