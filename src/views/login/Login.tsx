import React,{useState,useEffect} from 'react'
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
} from '@coreui/react';
import {  FormikValues, useFormik } from 'formik';
import Cookies from 'js-cookie';
import { validate } from './LoginValidation';
import { useHistory } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../../constants';
import './login.scss';
import { dataSource } from '../../http/ApolloClientProvider';
import { useLoginAdminMutation } from '../../Graphql/generated/graphql';




const Login = () => {



  const history = useHistory();


  const setHeaderParams = dataSource();

  const { mutate,isLoading,isSuccess,isError,data,error } = useLoginAdminMutation(setHeaderParams);



  useEffect(()=>{



  if(isSuccess)
  {
    if(data?.loginAdmin?.success)
    {

      Cookies.set(JWT_TOKEN_KEY,  data?.loginAdmin?.token as string);
        history.push('/dashboard');
    }

  }



  },[isLoading])



const formik:FormikValues = useFormik({
  initialValues: {
   email:'',
   password:''
  },
  validate,
  onSubmit: (values:any) =>
  {
    mutate(values);
  },
});






const goToForgotPasswordPage = ():void =>
{
  history.push('/forgot-password');
}






  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" id="containerLogin" data-testid="login-root">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-12">
                <CCardBody>
                  <CForm  onSubmit={formik.handleSubmit} data-testid='form-login-container'>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Login Here</p>

                    <div className="response responseContentDiv"
        data-testid="responseLoginDiv">

             {
                isLoading ?
                <div className="loading-text">loading.....</div>
                :
            error!==void 0 &&  error?.message ?
            <div className="error_form_response" data-testid="error_form_response">{error?.message}</div>
             :

             null
             }

           </div>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className='fa fa-user'></i>
                      </CInputGroupText>
                      <CFormInput
                       placeholder="Enter your email"
                      id="email"
                     name="email"
                     data-testid="login-email-form"
                     onChange={formik.handleChange}
                   value={formik.values.email}
                      />
                        <div className="error_form_response" data-testid="login-email-validation-response">

                      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                            </div>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <i className='fa fa-key'></i>
                        {/* <CIcon icon={cilLockLocked} /> */}
                      </CInputGroupText>
                      <CFormInput
                      type="password"
                        id="password"
                        name="password"
                        data-testid="login-password-form"
                        placeholder='enter your password'
                        onChange={formik.handleChange}
                      value={formik.values.password}
                      />
                        <div className="error_form_response" data-testid="login-password-validation-response">

                      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                         </div>


                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>



                        <CButton color="primary"
                         type="submit"
                         data-testid="btn-submit-user-form"
                        className="px-4">
                          Login
                        </CButton>

                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0"
                        data-testid="go-to-forgot-password-page"
                        onClick={ goToForgotPasswordPage }
                        >
                          Forgot password?
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

export default Login
