import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
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
import {  useMutation } from "@apollo/client";
import { LOGIN_ADMIN_MUTATION } from '../../Graphql/Auth/Mutations';
import {  FormikValues, useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import {Dispatch} from 'redux';
import { validate } from './ResetPasswordValidation';
import { useHistory } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../../constants';
import './login.scss';



const ResetPassword = () => {



  const [response,setResponse] = useState<any>('');



  const history = useHistory();



  const [loginAdmin, { data, loading  }] = useMutation(LOGIN_ADMIN_MUTATION,
    {
    onError: (err) =>
    {
        setResponse({name:err.name,message:err.message});
    },
    onCompleted: (data) =>
    {
      if(data.loginAdmin.success)
      {

        Cookies.set(JWT_TOKEN_KEY,data.loginAdmin.token);
        history.push('/dashboard');
      }


    },
  });




const formik:FormikValues = useFormik({
  initialValues: {
    code:'',
   email:'',
   password:''
  },
  validate,
  onSubmit: values =>
  {
    loginAdmin({
      variables: values
    });

  },
});






const goToLoginPage = ():void =>
{
  history.push('/login');
}






  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" id="containerResetPassword" data-testid="reset-password-root">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-12">
                <CCardBody>
                  <CForm  onSubmit={formik.handleSubmit} data-testid='form-login-container'>
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Reset Password</p>

                    <div className="response responseContentDiv"
        data-testid="responseResetPasswordDiv">

             {
                loading ?
                <div className="loading-text">loading.....</div>
                :
             response !='' && response.hasOwnProperty('message') ?
            <div className="error_form_response">{response.message}</div>
             :

             null
             }

           </div>


           <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className='fa fa-key'></i>
                      </CInputGroupText>
                      <CFormInput
                       placeholder="Enter passcode"
                      id="code"
                     name="code"
                     data-testid="reset-password-code-form"
                     onChange={formik.handleChange}
                   value={formik.values.email}
                      />
                        <div className="error_form_response" data-testid="reset-password-code-validation-response">

                      {formik.errors.code ? <div>{formik.errors.code}</div> : null}

                            </div>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className='fa fa-user'></i>
                      </CInputGroupText>
                      <CFormInput
                       placeholder="Enter password"
                      id="password"
                     name="password"
                     data-testid="reset-password-password-form"
                     onChange={formik.handleChange}
                   value={formik.values.password}
                      />
                        <div className="error_form_response" data-testid="reset-pasword-password-validation-response">

                      {formik.errors.email ? <div>{formik.errors.password}</div> : null}

                            </div>
                    </CInputGroup>


                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <i className='fa fa-key'></i>
                        {/* <CIcon icon={cilLockLocked} /> */}
                      </CInputGroupText>
                      <CFormInput
                      type="password"
                        id="confirm"
                        name="confirm"
                        data-testid="reset-password-confirm-code-form"
                        placeholder='enter your password'
                        onChange={formik.handleChange}
                      value={formik.values.confirm}
                      />
                        <div className="error_form_response" data-testid="reset-password-confirm-validation-response">

                      {formik.errors.confirm ? <div>{formik.errors.confirm}</div> : null}

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
                        onClick={ goToLoginPage }
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

export default ResetPassword
