describe('Bulk Email Test', () => {

beforeEach(() => {
// Visit your local app
cy.visit('http://localhost:5173/')
})

it('should upload Excel file and show success message', () => {


// 1. Upload Excel file from fixtures folder
cy.get('input[type="file"]')
  .should('exist')
  .selectFile('cypress/fixtures/sample.xlsx')

// 2. Click Send Email button
cy.contains('Send Email')
  .should('be.visible')
  .and('not.be.disabled')
  .click()

// 3. Verify success message appears
cy.contains('Email sent successfully', { timeout: 10000 })
  .should('be.visible')


})
})
