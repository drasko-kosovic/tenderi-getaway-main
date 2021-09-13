import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('ViewVrednovanje e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/view-vrednovanjes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('view-vrednovanje');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load ViewVrednovanjes', () => {
    cy.intercept('GET', '/services/otvoreni/api/view-vrednovanjes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-vrednovanje');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('ViewVrednovanje').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details ViewVrednovanje page', () => {
    cy.intercept('GET', '/services/otvoreni/api/view-vrednovanjes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-vrednovanje');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('viewVrednovanje');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });
});
