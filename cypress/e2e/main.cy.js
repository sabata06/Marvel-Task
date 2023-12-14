
describe('marvel search', () => {
  it('search', () => {
    cy.visit("http://localhost:3000/")
    cy.viewport(1200, 1200)
    cy.url().should("include", "/")
  })
})