import React,{useState,useRef, useEffect} from 'react'
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
import { useMutation } from 'react-query';
import {dataSource} from '../../../http/ApolloClientProvider';
import { useCreateUserTypeMutation } from '../../../Graphql/generated/graphql';



const  CreateUserType = () => {

  let fileInput = useRef<any>();

  const setHeaderParams = dataSource();

   const {mutate,isError,isSuccess,isLoading,data,error} = useCreateUserTypeMutation(setHeaderParams);



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

      const valuesToSubmit:any = {
        type:values.type,
        type_icon:fileInput.current.files[0]
      }

   mutate(valuesToSubmit)

    },
  });




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
                isLoading ?
                <div className="loading-text">loading.....</div>
                :
             error!==void 0 &&  error?.message ?
            <div className="error_form_response" data-testid="error_form_response">{error?.message}</div>
             :
             <div className="success_form_response" data-testid="success_form_response">{data?.createUserType?.message}</div>
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
                       placeholder="Select a file"
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
