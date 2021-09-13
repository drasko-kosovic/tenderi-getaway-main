import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('ViewPonude e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/view-ponudes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('view-ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load ViewPonudes', () => {
    cy.intercept('GET', '/services/otvoreni/api/view-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-ponude');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('ViewPonude').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details ViewPonude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/view-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-ponude');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('viewPonude');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });
});
