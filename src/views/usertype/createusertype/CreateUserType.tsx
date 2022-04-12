import React,{useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput
} from '@coreui/react'
import {  FormikValues, useFormik } from 'formik';
import { validate } from './CreateUserTypeValidation';
import './CreateUserType.scss';
import { useMutation } from '@apollo/client';
import { CREATE_USER_TYPE } from '../../../Graphql/Mutations/UserType';
import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '../../../constants';



const  CreateUserType = () => {

  let fileInput = useRef<any>();

  const [createUserType, { data, loading  }] = useMutation(CREATE_USER_TYPE,
    {
    onError: (err) =>
    {
        setResponse({name:err.name,message:err.message});
    },
    onCompleted: (data) =>
    {

      if(data.createUserType.success)
      {
        setResponse({message:data.createUserType.message});
      }


    },
  });


  const formik:FormikValues = useFormik({
    initialValues: {
     type:'',
     type_icon:''
    },
    validate : (values) =>
    {
      let dataItem:any = {
        type :values.type,
        type_icon:fileInput.current.files.length==0?'':fileInput.current.files[0].name
      }

     return validate(dataItem);
    },

    onSubmit: values =>
    {

      const valuesToSubmit = {
        type:values.type,
        type_icon:fileInput.current.files[0]
      }


     createUserType({
       variables:valuesToSubmit
     })


    },
  });

  const [response,setResponse] = useState<any>('');


  return (
    <div className=" c-default-layout flex-row align-items-center" id="containerUserType">
      <CContainer>
        <CRow className="justify-content-center">
        <CCol xs={12}>
      </CCol>
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>

                <CForm   data-testid='form-create-user-type' onSubmit={formik.handleSubmit}>

                <div className="response responseContentDiv"
        data-testid="responseLoginDiv">

             {
                loading ?
                <div className="loading-text">loading.....</div>
                :
             response !='' && response.hasOwnProperty('message') && response.hasOwnProperty('name')?
            <div className="error_form_response" data-testid="error_form_response">{response.message}</div>
             :
             <div className="success_form_response" data-testid="success_form_response">{response.message}</div>
             }

           </div>

                <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className='fa fa-user'></i>
                      </CInputGroupText>
                      <CFormInput
                       placeholder="Enter user type name"
                      id="type"
                     name="type"
                     data-testid="user-type-name"
                     onChange={formik.handleChange}
                   value={formik.values.type}
                      />
                        <div className="error_form_response" data-testid="user-type-validation">

                      {formik.errors.type ? <div>{formik.errors.type}</div> : null}

                            </div>
                    </CInputGroup>




                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className='fa fa-user'></i>
                      </CInputGroupText>
                      <CFormInput
                      type='file'
                       placeholder="Enter your email"
                      id="type_icon"
                     name="type_icon"
                     data-testid="type_icon_file"
                     onChange={formik.handleChange}
                   value={formik.values.type_icon}
                   ref={el => fileInput.current = el}
                      />
                        <div className="error_form_response" data-testid="type_icon_validation">

                      {formik.errors.type_icon ? <div>{formik.errors.type_icon}</div> : null}

                            </div>
                    </CInputGroup>




                     <CCol xs={6}>


                        <CButton color="primary"
                         type="submit"
                         data-testid="btn-submit-user-type-form"
                        className="px-4">
                         Create User Type
                        </CButton>

                      </CCol>

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

export default CreateUserType;
