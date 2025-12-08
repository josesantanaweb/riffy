describe('Comprar Boleto - API Real', () => {
  beforeEach(() => {
    cy.visit('/raffles');
  });

  it('Proceso de compra de rifa', () => {
    cy.get('.animate-pulse', { timeout: 10000 }).should('not.exist');

    cy.get('.bg-box-primary', { timeout: 10000 }).first().should('exist');

    cy.contains('button', 'Comprar boleto', { timeout: 10000 })
      .first()
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    cy.url().should('match', /\/raffles\/[^/]+$/);

    cy.url().should('not.equal', Cypress.config().baseUrl + '/raffles');

    cy.contains('button', '2 Tickets', { timeout: 10000 })
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.wait(500);

    cy.contains('Cantidad', { timeout: 5000 })
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('.text-title')
          .should('contain', '2')
          .should('be.visible');
      });

    cy.contains('Precio por ticket', { timeout: 5000 })
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('.text-title')
          .should('be.visible')
          .should('contain', 'Bs.S')
          .should('contain', '10');
      });
  });
});
