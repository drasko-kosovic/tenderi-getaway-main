import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Ponudjaci e2e test', () => {
  const ponudjaciPageUrl = '/ponudjaci';
  const ponudjaciPageUrlPattern = new RegExp('/ponudjaci(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/ponudjacis').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/ponudjacis/*').as('deleteEntityRequest');
  });

  it('should load Ponudjacis', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Ponudjaci').should('exist');
    cy.url().should('match', ponudjaciPageUrlPattern);
  });

  it('should load details Ponudjaci page', function () {
    cy.visit(ponudjaciPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('ponudjaci');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudjaciPageUrlPattern);
  });

  it('should load create Ponudjaci page', () => {
    cy.visit(ponudjaciPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponudjaci');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudjaciPageUrlPattern);
  });

  it('should load edit Ponudjaci page', function () {
    cy.visit(ponudjaciPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponudjaci');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudjaciPageUrlPattern);
  });

  it('should create an instance of Ponudjaci', () => {
    cy.visit(ponudjaciPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponudjaci');

    cy.get(`[data-cy="nazivPonudjaca"]`).type('Fresh Fundamental').should('have.value', 'Fresh Fundamental');

    cy.get(`[data-cy="odgovornoLice"]`).type('Cotton').should('have.value', 'Cotton');

    cy.get(`[data-cy="adresaPonudjaca"]`).type('connect Colombia expedite').should('have.value', 'connect Colombia expedite');

    cy.get(`[data-cy="bankaRacun"]`).type('Technician').should('have.value', 'Technician');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudjaciPageUrlPattern);
  });

  it('should delete last instance of Ponudjaci', function () {
    cy.visit(ponudjaciPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('ponudjaci').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ponudjaciPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
