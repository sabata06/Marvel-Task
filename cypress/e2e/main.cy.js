describe('marvel search', () => {
  it('home-page', () => {
    cy.visit("http://localhost:3000/")
    cy.viewport(1200, 1200)
    cy.url().should("include", "/")
    const character = {
      id: 1,
      name: 'Iron Man',
      thumbnail: {
        path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
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
  beforeEach(() => {
    cy.visit('http://localhost:3000/details/1011114');
  });

  it('successfully loads and displays character details', () => {
    cy.get('.display-1').should('be.visible'); // Karakterin adını kontrol eder
    cy.get('.h4').should('be.visible'); // Karakterin açıklamasını kontrol eder
    cy.get('.mt-5').should('be.visible'); // Karakterin çizgi romanlarının listelendiğini kontrol eder
  });

  it('goes back to the previous page when "Go Back" is clicked', () => {
    cy.get('[data-test="goBack"]').click(); // "Go Back" linkine tıklar
    cy.url().should('not.include', '/details/1011114'); // URL'in artık karakter detay sayfasını içermediğini kontrol eder
  });

})

