describe('marvel search', () => {
  it('home-page', () => {
    cy.visit("http://localhost:3000/")
    cy.viewport(1200, 1200)
    cy.url().should("include", "/")
    const character = {
      id: 1,
      name: 'Iron Man',
      thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
      },
    };
    cy.visit("http://localhost:3000/")
    cy.get('.character-card').first().click();
    cy.url().should('include', '/details/1');
 
  })
  it('searches for characters', () => {
    cy.visit("http://localhost:3000/")
    cy.get('input[type="search"]').type('Spider-Man');
    cy.get('.card-container').should('contain', 'Spider-Man');
  });
})

