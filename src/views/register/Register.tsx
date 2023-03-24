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
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { FormikValues, useFormik } from 'formik'
import Cookies from 'js-cookie'
import { validate } from './RegisterValidation'
import { useHistory } from 'react-router-dom'
import { JWT_TOKEN_KEY } from '../../constants'
import './register.scss'
import logo from '../../assets/images/logo.png'

const Register = () => {
  const history = useHistory()

  const formik: FormikValues = useFormik({
    initialValues: {
      first_name:'',
      last_name:'',
      email: '',
      password: '',
      confirm_password: '',
    },
    validate,
    onSubmit: (values: any) => {

      console.log(values)
    },
  })

  const goToForgotPasswordPage = (): void => {
    history.push('/forgot-password')
  }

  const goToLoginPage = (): void => {
    history.push('/login')
  }

  return (
    <div
      className="set-background-img min-vh-100 d-flex flex-row align-items-center"
      id="containerRegister"
      data-testid="register-root"
    >
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
                    data-testid="form-login-container"
                  >
                    <h3 className="auth-header">SignUp</h3>

                    <div className="response responseContentDiv" data-testid="responseLoginDiv">
                      {
                        //     isLoading ?
                        //     <div className="loading-text">loading.....</div>
                        //     :
                        // error!==void 0 &&  error?.message ?
                        // <div className="error_form_response" data-testid="error_form_response">{error?.message}</div>
                        //  :

                        null
                      }
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-user"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="First name"
                        id="first_name"
                        name="first_name"
                        data-testid="register-first-name-form"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                      />
                      <div
                        className="error_form_response"
                        data-testid="register-first-name-validation-response"
                      >
                        {formik.errors.first_name ? <div>{formik.errors.first_name}</div> : null}
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-user"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Last name"
                        id="last_name"
                        name="last_name"
                        data-testid="register-last-name-form"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                      />
                      <div
                        className="error_form_response"
                        data-testid="register-last-name-validation-response"
                      >
                        {formik.errors.last_name ? <div>{formik.errors.last_name}</div> : null}
                      </div>
                    </CInputGroup>


                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-envelope"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        id="email"
                        name="email"
                        data-testid="login-email-form"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <div
                        className="error_form_response"
                        data-testid="login-email-validation-response"
                      >
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <i className="fa fa-key"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="password"
                        name="password"
                        data-testid="register-password-form"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <div
                        className="error_form_response"
                        data-testid="login-password-validation-response"
                      >
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                      </div>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <i className="fa fa-key"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        data-testid="register-repeat-password-form"
                        placeholder="confirm password"
                        onChange={formik.handleChange}
                        value={formik.values.confirm_password}
                      />
                      <div
                        className="error_form_response"
                        data-testid="register-repeat-password-validation-response"
                      >
                        {formik.errors.confirm_password ? <div>{formik.errors.confirm_password}</div> : null}
                      </div>
                    </CInputGroup>

                    <div className="d-grid">
                      <CButton color="primary" type='submit' className="added-btn-style">
                        SignUp
                      </CButton>
                    </div>

                    <CRow>
                      <CCol xs={12} className="links-section-on-auth">
                        <CButton
                          color="link"
                          className="px-0"
                          data-testid="go-to-forgot-password-page"
                          onClick={goToLoginPage}
                        >
                          Login
                        </CButton>
                        <span> | </span>
                        <CButton
                          color="link"
                          className="px-0"
                          data-testid="go-to-forgot-password-page"
                          onClick={goToForgotPasswordPage}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>

                      <CCol xs={12} className="login-with-socials">
                        <label className="login-social-icon">
                          <span className='login-social-icon-span'>Login with Social</span>
                        </label>
                        <div className="d-flex justify-content-center">

                          <a href="#">
                            <div className="social-login me-4 text-center">
                              <i className="fa fa-google"></i>
                            </div>
                          </a>

                          <a href="#">
                            <div className="social-login text-center">
                              <i className="fa fa-apple"></i>
                            </div>
                          </a>

                        </div>
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

export default Register


