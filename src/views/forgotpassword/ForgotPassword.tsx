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
import { validate } from './ForgotPasswordValidation';
import { useHistory } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../../constants';
import './forgotpassword.scss';



const ForgotPassword = () => {



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






const goToLoginPage = ():void =>
{
  history.push('/login');
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
                    <p className="text-medium-emphasis">Enter A valid Email Address</p>

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

                      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

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
                        onClick={ goToLoginPage }
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

export default ForgotPassword
