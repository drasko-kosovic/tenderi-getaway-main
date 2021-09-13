import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('ViewPrvorangirani e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/view-prvorangiranis*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('view-prvorangirani');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load ViewPrvorangiranis', () => {
    cy.intercept('GET', '/services/otvoreni/api/view-prvorangiranis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-prvorangirani');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('ViewPrvorangirani').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details ViewPrvorangirani page', () => {
    cy.intercept('GET', '/services/otvoreni/api/view-prvorangiranis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-prvorangirani');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('viewPrvorangirani');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });
});
