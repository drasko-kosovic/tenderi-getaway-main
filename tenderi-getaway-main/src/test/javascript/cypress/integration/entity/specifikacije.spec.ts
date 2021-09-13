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

describe('Specifikacije e2e test', () => {
  const specifikacijePageUrl = '/specifikacije';
  const specifikacijePageUrlPattern = new RegExp('/specifikacije(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/specifikacijes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/specifikacijes/*').as('deleteEntityRequest');
  });

  it('should load Specifikacijes', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Specifikacije').should('exist');
    cy.url().should('match', specifikacijePageUrlPattern);
  });

  it('should load details Specifikacije page', function () {
    cy.visit(specifikacijePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('specifikacije');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', specifikacijePageUrlPattern);
  });

  it('should load create Specifikacije page', () => {
    cy.visit(specifikacijePageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Specifikacije');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', specifikacijePageUrlPattern);
  });

  it('should load edit Specifikacije page', function () {
    cy.visit(specifikacijePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Specifikacije');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', specifikacijePageUrlPattern);
  });

  it('should create an instance of Specifikacije', () => {
    cy.visit(specifikacijePageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Specifikacije');

    cy.get(`[data-cy="sifraPostupka"]`).type('86193').should('have.value', '86193');

    cy.get(`[data-cy="brojPartije"]`).type('34122').should('have.value', '34122');

    cy.get(`[data-cy="atc"]`).type('International').should('have.value', 'International');

    cy.get(`[data-cy="inn"]`).type('networks deliverables').should('have.value', 'networks deliverables');

    cy.get(`[data-cy="farmaceutskiOblikLijeka"]`).type('platforms Human').should('have.value', 'platforms Human');

    cy.get(`[data-cy="jacinaLijeka"]`).type('Tennessee Communications').should('have.value', 'Tennessee Communications');

    cy.get(`[data-cy="jedinicaMjere"]`).type('Lights infomediaries Checking').should('have.value', 'Lights infomediaries Checking');

    cy.get(`[data-cy="procijenjenaVrijednost"]`).type('9697').should('have.value', '9697');

    cy.get(`[data-cy="pakovanje"]`).type('Wooden Assimilated executive').should('have.value', 'Wooden Assimilated executive');

    cy.get(`[data-cy="trazenaKolicina"]`).type('78172').should('have.value', '78172');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', specifikacijePageUrlPattern);
  });

  it('should delete last instance of Specifikacije', function () {
    cy.visit(specifikacijePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('specifikacije').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', specifikacijePageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
