describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://fi.wikipedia.org');
    cy.reload();
    cy.get('.search-toggle').click();
    cy.get('input[name="search"]:visible').type('JAMK');
    cy.get('input[name="search"]:visible').type('{enter}');
    cy.wait(5000);
    cy.url().should('include', 'Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu');
    cy.get('#Kampukset').should('be.visible').scrollIntoView();
    cy.wait(5000);
    cy.visit(
      'https://en.wikipedia.org/wiki/JAMK_University_of_Applied_Sciences'
    );
    cy.url().should('include', 'JAMK_University_of_Applied_Sciences');
  });
});
 