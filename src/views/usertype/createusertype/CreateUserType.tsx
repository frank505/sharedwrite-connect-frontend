import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'


const  CreateUserType = () => {





  return (
    <div className=" c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
        <CCol xs={12}>
      </CCol>
          <CCol md="12">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                   <div>hello world</div>
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
