/// <reference types="cypress" />


context('Actions', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('[data-testid="go-to-forgot-password-page"').click();
  })




describe("index page activity", ()=>
{
  it('shows error message for email field', ()=>{

      cy.get('[data-testid="forgot-password-email-form"]').type('dss');
     cy.get('[data-testid="forgot-password-email-validation-response"]').should('not.have.html','');

  });


  it('submits form and fails', ()=>
  {
    cy.get('[data-testid="forgot-password-email-form"]').type('dddd@gmail.com');
    cy.get('[data-testid="form-forgot-password-container"]').submit();
    cy.get('[data-testid="forgot-password-email-validation-response"]').should('have.html','');
    cy.get('[data-testid="error_form_response"]').should('not.have.html','');
  })


it('forgot password form submitted successfully is successfully',()=>
{
  cy.get('[data-testid="forgot-password-email-form"]').type('akpufranklin2@gmail.com');
  cy.get('[data-testid="form-forgot-password-container"]').submit();

  cy.task("dbQuery", {"query":
  "SELECT * FROM password_reset where email='akpufranklin2@gmail.com' ORDER BY ID DESC LIMIT 1"
}).then(queryResponse => {
  let code = queryResponse[0].code;
  cy.get('[data-testid="reset-password-code-form"]').type(code);
  cy.get('[data-testid="reset-password-password-form"]').type("password");
  cy.get('[data-testid="reset-password-confirm-code-form"]').type("password");
  cy.get('[data-testid="form-reset-password-container"]').submit();
  cy.get('[data-testid="responseResetPasswordDiv"]').should('not.have.html','');
  });
});
});


});
