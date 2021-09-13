import { entityItemSelector } from '../../support/commands';
import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('ViewPonude e2e test', () => {
  const viewPonudePageUrl = '/view-ponude';
  const viewPonudePageUrlPattern = new RegExp('/view-ponude(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/view-ponudes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/view-ponudes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/view-ponudes/*').as('deleteEntityRequest');
  });

  it('should load ViewPonudes', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('view-ponude');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ViewPonude').should('exist');
    cy.url().should('match', viewPonudePageUrlPattern);
  });

  it('should load details ViewPonude page', function () {
    cy.visit(viewPonudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('viewPonude');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', viewPonudePageUrlPattern);
  });
});
