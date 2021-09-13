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

describe('Postupci e2e test', () => {
  const postupciPageUrl = '/postupci';
  const postupciPageUrlPattern = new RegExp('/postupci(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/postupcis+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/postupcis').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/postupcis/*').as('deleteEntityRequest');
  });

  it('should load Postupcis', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Postupci').should('exist');
    cy.url().should('match', postupciPageUrlPattern);
  });

  it('should load details Postupci page', function () {
    cy.visit(postupciPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('postupci');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', postupciPageUrlPattern);
  });

  it('should load create Postupci page', () => {
    cy.visit(postupciPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Postupci');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', postupciPageUrlPattern);
  });

  it('should load edit Postupci page', function () {
    cy.visit(postupciPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Postupci');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', postupciPageUrlPattern);
  });

  it('should create an instance of Postupci', () => {
    cy.visit(postupciPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Postupci');

    cy.get(`[data-cy="sifraPostupka"]`).type('10756').should('have.value', '10756');

    cy.get(`[data-cy="brojTendera"]`).type('back-end').should('have.value', 'back-end');

    cy.get(`[data-cy="opisPostupka"]`).type('Rubber').should('have.value', 'Rubber');

    cy.get(`[data-cy="vrstaPostupka"]`).type('override').should('have.value', 'override');

    cy.get(`[data-cy="datumObjave"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(`[data-cy="datumOtvaranja"]`).type('2021-09-05').should('have.value', '2021-09-05');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', postupciPageUrlPattern);
  });

  it('should delete last instance of Postupci', function () {
    cy.visit(postupciPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('postupci').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', postupciPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
