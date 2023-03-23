/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  })

  describe('index page activity', () => {
    it('shows error message for email field', () => {
      cy.get('[data-testid="login-email-form"]').type('dss')
      cy.get('[data-testid="login-password-form"]').type('ssss')
      cy.get('[data-testid="login-email-validation-response"]').should('not.have.html', '')
      cy.get('[data-testid="login-password-validation-response"]').should('have.html', '')
    })

    it('show password character length error', () => {
      cy.get('[data-testid="login-email-form"]').type('dddd@gmail.com')
      cy.get('[data-testid="login-password-form"]').type('ssss')
      cy.get('[data-testid="form-login-container"]').submit()
      cy.get('[data-testid="login-email-validation-response"]').should('have.html', '')
      cy.get('[data-testid="login-password-validation-response"]').should('have.html', '')
      cy.get('[data-testid="error_form_response"]').should('not.have.html', '')
    })

    it('submits form and fails', () => {
      cy.get('[data-testid="login-email-form"]').type('dddd@gmail.com')
      cy.get('[data-testid="login-password-form"]').type('password')
      cy.get('[data-testid="form-login-container"]').submit()
      cy.get('[data-testid="login-email-validation-response"]').should('have.html', '')
      cy.get('[data-testid="login-password-validation-response"]').should('have.html', '')
      cy.get('[data-testid="error_form_response"]').should('not.have.html', '')
    })

    it('logins successfully', () => {
      cy.get('[data-testid="login-email-form"]').type('akpufranklin2@gmail.com')
      cy.get('[data-testid="login-password-form"]').type('password')
      cy.get('[data-testid="form-login-container"]').submit()
      cy.get('.sidebar-brand').should('be.visible')
    })
  })
})
