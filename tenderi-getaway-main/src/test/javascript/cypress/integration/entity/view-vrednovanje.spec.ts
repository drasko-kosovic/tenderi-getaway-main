import { entityItemSelector } from '../../support/commands';
import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('ViewVrednovanje e2e test', () => {
  const viewVrednovanjePageUrl = '/view-vrednovanje';
  const viewVrednovanjePageUrlPattern = new RegExp('/view-vrednovanje(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/otvoreni/api/view-vrednovanjes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/view-vrednovanjes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/view-vrednovanjes/*').as('deleteEntityRequest');
  });

  it('should load ViewVrednovanjes', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-vrednovanje');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ViewVrednovanje').should('exist');
    cy.url().should('match', viewVrednovanjePageUrlPattern);
  });

  it('should load details ViewVrednovanje page', function () {
    cy.visit(viewVrednovanjePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('viewVrednovanje');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', viewVrednovanjePageUrlPattern);
  });
});
