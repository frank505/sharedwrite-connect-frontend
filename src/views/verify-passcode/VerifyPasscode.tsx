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
import { JWT_TOKEN_KEY, VERIFY_PASSCODE_PARAM } from '../../constants'
import logo from '../../assets/images/logo.png'
import { useResendVerifyAccountMutation, usePasscodeVerifyMutation, v1Api } from '../../http/ApiSetup'
import {  ThreeDots } from 'react-loader-spinner'
import * as _ from 'lodash'
import { getErrorMessage } from '../../helpers/helperFunc';
import { useDispatch } from 'react-redux';


const VerifyPasscode = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [passcodeVerify, result ] = usePasscodeVerifyMutation();
  const [resendVerifyAccount, resultData ] = useResendVerifyAccountMutation();
  const [ErrorAlert, setErrorAlert] = useState('')
  const [SuccessAlert, setSuccessAlert] = useState('')

  useEffect(()=> {
   const token = Cookies.get(VERIFY_PASSCODE_PARAM);
   if(_.isEmpty(token)){
      history.push('/login');
   }
  }, [])


  useEffect(() => {
    if (result.isError) {
      getErrorMessage(result?.error, setErrorAlert, ['failed to verify passcode']);
    }
  }, [result.isError]);

  useEffect(() => {
    if (resultData.isError) {
      getErrorMessage(resultData?.error, setErrorAlert, ['failed to resend passcode']);
    }
  }, [resultData.isError]);

  useEffect(() => {
    if (resultData.isSuccess) {
      Cookies.set(VERIFY_PASSCODE_PARAM, resultData?.data?.data?.url_params);
      setSuccessAlert(resultData?.data?.message);
    }
  }, [resultData.isSuccess]);

  const formik: FormikValues = useFormik({
    initialValues: {
       code: '',
      purpose:'email_verification',
      verify_passcode_token: Cookies.get(VERIFY_PASSCODE_PARAM)
    },
    validate,
    onSubmit: (values: any) => {
      setErrorAlert('');
      setSuccessAlert('');
      passcodeVerify(values);
    },
  })

  const goToRegisterPage = (): void => {
    history.push('/register')
  }

  const goToLoginPage = (): void => {
    history.push('/login')
  }


  const requestNewPasscode = () => {
    const token = Cookies.get(VERIFY_PASSCODE_PARAM);
    if(_.isEmpty(token)){
     return history.push('/login');
    }
    setErrorAlert('');
    setSuccessAlert('');
    resendVerifyAccount({purpose:'email_verification', verify_passcode_token: Cookies.get(VERIFY_PASSCODE_PARAM)})
  }

  return (
  <div className=" min-vh-100 d-flex flex-row align-items-center"
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
                      {( !_.isEmpty(ErrorAlert) ) && (
                        <CAlert color="danger" data-testid="register-error-response">
                          {ErrorAlert}
                        </CAlert>
                      )}

                      { (result.isLoading || resultData.isLoading) && (
                        <ThreeDots
                          height="50"
                          width="50"
                          radius="9"
                          color="#6c5ffc"
                          ariaLabel="three-dots-loading"
                          wrapperClass="three-dots-loader-style"
                          visible={true}
                        />
                      )}


                      { ( !_.isEmpty(SuccessAlert) ) &&  (
                        <CAlert color="success" data-testid="register-success-response">
                          {SuccessAlert}
                        </CAlert>
                      )}


                    </div>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="fa fa-lock"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter Passcode"
                        id="code"
                        name="code"
                        data-testid="register-first-name-form"
                        onChange={formik.handleChange}
                        value={formik.values.code}
                      />
                      <div
                        className="error_form_response"
                        data-testid="verify-passcode-passcode-validation-response"
                      >
                        {formik.errors.code ? <div>{formik.errors.code}</div> : null}
                      </div>
                    </CInputGroup>



                    <div className="d-grid">
                      <CButton
                        color="primary"
                        type="submit"
                        className="added-btn-style"
                        disabled={result.isLoading || resultData.isLoading}
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
                          onClick={requestNewPasscode}
                        >
                          Request New Passcode
                        </CButton>

                      </CCol>

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
