import { entityItemSelector } from '../../support/commands';
import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('ViewPrvorangirani e2e test', () => {
  const viewPrvorangiraniPageUrl = '/view-prvorangirani';
  const viewPrvorangiraniPageUrlPattern = new RegExp('/view-prvorangirani(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/view-prvorangiranis+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/view-prvorangiranis').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/view-prvorangiranis/*').as('deleteEntityRequest');
  });

  it('should load ViewPrvorangiranis', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-prvorangirani');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ViewPrvorangirani').should('exist');
    cy.url().should('match', viewPrvorangiraniPageUrlPattern);
  });

  it('should load details ViewPrvorangirani page', function () {
    cy.visit(viewPrvorangiraniPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('viewPrvorangirani');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', viewPrvorangiraniPageUrlPattern);
  });
});
