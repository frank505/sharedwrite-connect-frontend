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
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD_CODE_ADMIN } from '../../Graphql/Mutations/Auth';
import { Formik, FormikErrors, FormikValues, useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import {Dispatch} from 'redux';
import { validate } from './ForgotPasswordValidation';
import { useHistory } from 'react-router-dom';
import './forgotpassword.scss';



const ForgotPassword = () => {



  const [response,setResponse] = useState<any>('');

  const history = useHistory();

  const [forgotPasswordAdmin, { data, loading  }] = useMutation(FORGOT_PASSWORD_CODE_ADMIN,
    {
    onError: (err) =>
    {
        setResponse({name:err.name,message:err.message});
    },
    onCompleted: (data) =>
    {
      if(data.forgotPasswordAdmin.success)
      {
        history.push(
          {
            pathname:'/reset-password',
            state:{
              emailToResetPassword:data.forgotPasswordAdmin.email
            }
          }
          );
      }


    },
  });




const formik:FormikValues = useFormik({
  initialValues: {
   email:'',
  },
  validate,
  onSubmit: values =>
  {
    forgotPasswordAdmin({
      variables: values
    });

  },

});



const goToLoginPage = ():void =>
{
  history.push('/login');
}





  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" id="containerForgotPassword" data-testid="forgot-password-root">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-12">
                <CCardBody>
                  <CForm  onSubmit={formik.handleSubmit} data-testid='form-forgot-password-container'>
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">Enter A valid Email Address</p>

                    <div className="response responseContentDiv"
        data-testid="responseForgotPasswordDiv">

             {
                loading ?
                <div className="loading-text">loading.....</div>
                :
             response !='' && response.hasOwnProperty('message') ?
            <div className="error_form_response" data-testid="error_form_response">{response.message}</div>
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
                     data-testid="forgot-password-email-form"
                     onChange={formik.handleChange}
                   value={formik.values.email}
                      />
                        <div className="error_form_response" data-testid="forgot-password-email-validation-response">

                      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                            </div>
                    </CInputGroup>



                    <CRow>
                      <CCol xs={6}>



                        <CButton color="primary"
                         type="submit"
                         data-testid="btn-submit-user-form"
                        className="px-4">
                          Forgot Password
                        </CButton>

                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0"
                        data-testid="go-to-login-page"
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
