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

describe('Ugovor e2e test', () => {
  const ugovorPageUrl = '/ugovor';
  const ugovorPageUrlPattern = new RegExp('/ugovor(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/ugovors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/ugovors').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/ugovors/*').as('deleteEntityRequest');
  });

  it('should load Ugovors', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Ugovor').should('exist');
    cy.url().should('match', ugovorPageUrlPattern);
  });

  it('should load details Ugovor page', function () {
    cy.visit(ugovorPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('ugovor');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ugovorPageUrlPattern);
  });

  it('should load create Ugovor page', () => {
    cy.visit(ugovorPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ugovor');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ugovorPageUrlPattern);
  });

  it('should load edit Ugovor page', function () {
    cy.visit(ugovorPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Ugovor');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ugovorPageUrlPattern);
  });

  it('should create an instance of Ugovor', () => {
    cy.visit(ugovorPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ugovor');

    cy.get(`[data-cy="brojUgovora"]`).type('Auto engage Customer').should('have.value', 'Auto engage Customer');

    cy.get(`[data-cy="datumUgovora"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(`[data-cy="brojOdluke"]`).type('Towels Fish Gardens').should('have.value', 'Towels Fish Gardens');

    cy.get(`[data-cy="datumOdluke"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(`[data-cy="iznosUgovoraBezPdf"]`).type('93563').should('have.value', '93563');

    cy.get(`[data-cy="sifraPostupka"]`).type('59954').should('have.value', '59954');

    cy.get(`[data-cy="sifraPonude"]`).type('89425').should('have.value', '89425');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ugovorPageUrlPattern);
  });

  it('should delete last instance of Ugovor', function () {
    cy.visit(ugovorPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('ugovor').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ugovorPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
