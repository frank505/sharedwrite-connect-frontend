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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useMutation } from "@apollo/client";
import { LOGIN_ADMIN_MUTATION } from '../../Graphql/Auth/Mutations';
import { Formik, FormikErrors, FormikValues, useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import {Dispatch} from 'redux';
import { validate } from './LoginValidation';
import { useHistory } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../../constants';
import './login.scss';



const Login = () => {



  const [response,setResponse] = useState<any>('');



  const dispatch:Dispatch =  useDispatch();

  const history = useHistory();

  const [loginAdmin, { data, loading  }] = useMutation(LOGIN_ADMIN_MUTATION,
    {
    onError: (err) =>
    {
        setResponse({name:err.name,message:err.message});
    },
    onCompleted: (data) =>
    {
      if(data.loginAdmin?.success)
      {

        Cookies.set(JWT_TOKEN_KEY,data.loginAdmin?.token);
        history.push('/dashboard');
      }


    },
  });




const formik:FormikValues = useFormik({
  initialValues: {
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






const goToForgotPasswordPage = ():void =>
{
  history.push('/auth/register');
}






  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" id="containerLogin" data-testid="login">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-12">
                <CCardBody>
                  <CForm  onSubmit={formik.handleSubmit} data-testid='form-login-container'>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>

                    <div className="response responseContentDiv"
        data-testid="responseLoginDiv">

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
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                       placeholder="Enter your email"
                      id="email"
                     name="email"
                     data-testid="login-email-form"
                     onChange={formik.handleChange}
                   value={formik.values.email}
                      />
                        <div className="error_form_response" data-testid="login-password-validation-response">

                      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                            </div>
                    </CInputGroup>


                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                      type="password"
                        id="password"
                        name="password"
                        data-testid="login-password-form"
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
