describe("Test Add 4 todos page", () => {
    //
    // This is a quick smoke test, checks the full CRUD operations
    // by creating, reading, updating and deleting 4 todo items.
    // run the Cypress app from the commandline ->   ./node_modules/.bin/cypress open
    //
    it("Should be able to create 4 steps, check as completed, delete all 4", () => {
     cy.visit('http://localhost:3000')
     cy.get('#addtodo').type('Step 1')
     cy.get('#addtodobutton').click()
     cy.get('#addtodo').type('Step 2')
     cy.get('#addtodobutton').click()
     cy.get('#addtodo').type('Step 3')
     cy.get('#addtodobutton').click()
     cy.get('#addtodo').type('Step 4')
     cy.get('#addtodobutton').click()
  
     cy.get('#items > :nth-child(1) > .card > .card-body > .card-title').should('have.text', 'Step 1')
     cy.get('#items > :nth-child(2) > .card > .card-body > .card-title').should('have.text', 'Step 2')
     cy.get('#items > :nth-child(3) > .card > .card-body > .card-title').should('have.text', 'Step 3')
     cy.get('#items > :nth-child(4) > .card > .card-body > .card-title').should('have.text', 'Step 4')
  
     cy.get('#items > :nth-child(4) > .card > .card-body > .list-group > :nth-child(1) > .form-check > .form-check-input').click()
     cy.get('#items > :nth-child(3) > .card > .card-body > .list-group > :nth-child(1) > .form-check > .form-check-input').click()
     cy.get('#items > :nth-child(2) > .card > .card-body > .list-group > :nth-child(1) > .form-check > .form-check-input').click()
     cy.get('#items > :nth-child(1) > .card > .card-body > .list-group > :nth-child(1) > .form-check > .form-check-input').click()
     cy.get('#items > :nth-child(4) > .card > .card-body > .list-group > :nth-child(2) > .btn').click()
     cy.get('#items > :nth-child(3) > .card > .card-body > .list-group > :nth-child(2) > .btn').click()
     cy.get('#items > :nth-child(2) > .card > .card-body > .list-group > :nth-child(2) > .btn').click()
     cy.get('#items > :nth-child(1) > .card > .card-body > .list-group > :nth-child(2) > .btn').click()
    })
  })