describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://tiko.jamk.fi/~imjar/fronttiper/esimteht/pizza_anim/');
    cy.get('#nimi')
      .type('Testi Käyttäjä')
      .should('have.value', 'Testi Käyttäjä');
    cy.get('#puhelin').type('0401234567').should('have.value', '0401234567');
    cy.get('#sposti')
      .type('testi@example.com')
      .should('have.value', 'testi@example.com');
    cy.get('#koko')
      .select('Normaali', { force: true }) // valitaan option näkyvän tekstin perusteella
      .find('option:selected')
      .should('have.text', 'Normaali');
    cy.get('#Normaali').check().should('be.checked');
    cy.get('#Kinkku').check().should('be.checked');
    cy.get('#Tomaatti').check().should('be.checked');
  });
});