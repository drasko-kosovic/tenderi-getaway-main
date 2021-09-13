import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('Tenderihome e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/tenderihomes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('tenderihome');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Tenderihomes', () => {
    cy.intercept('GET', '/api/tenderihomes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('tenderihome');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Tenderihome').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Tenderihome page', () => {
    cy.intercept('GET', '/api/tenderihomes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('tenderihome');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('tenderihome');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });
});
