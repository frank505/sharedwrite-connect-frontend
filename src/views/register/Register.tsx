import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useHistory } from 'react-router-dom'
import './register.scss'

const Register = () => {
  const history = useHistory()

  const goToLoginPage = (): void => {
    history.push('/login')
  }

  const goToForgotPasswordPage = (): void => {
    history.push('/forgot-password')
  }
  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center containerRegister"
      id="containerRegister"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className="auth-header">Signup</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Firstname" autoComplete="firstname" />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Lastname" autoComplete="lastname" />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="primary">Create Account</CButton>
                  </div>

                  <CRow>
                    <CCol xs={6} className="text-left">
                      <CButton
                        color="link"
                        className="px-0"
                        data-testid="go-to-forgot-password-page"
                        onClick={goToForgotPasswordPage}
                      >
                        Forgot password?
                      </CButton>
                    </CCol>

                    <CCol xs={6} className="align-right">
                      <CButton
                        color="link"
                        className="px-0"
                        data-testid="go-to-forgot-password-page"
                        onClick={goToLoginPage}
                      >
                        Login Here
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
