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

describe('Narucilac e2e test', () => {
  const narucilacPageUrl = '/narucilac';
  const narucilacPageUrlPattern = new RegExp('/narucilac(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/narucilacs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/narucilacs').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/narucilacs/*').as('deleteEntityRequest');
  });

  it('should load Narucilacs', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Narucilac').should('exist');
    cy.url().should('match', narucilacPageUrlPattern);
  });

  it('should load details Narucilac page', function () {
    cy.visit(narucilacPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('narucilac');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', narucilacPageUrlPattern);
  });

  it('should load create Narucilac page', () => {
    cy.visit(narucilacPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Narucilac');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', narucilacPageUrlPattern);
  });

  it('should load edit Narucilac page', function () {
    cy.visit(narucilacPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Narucilac');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', narucilacPageUrlPattern);
  });

  it('should create an instance of Narucilac', () => {
    cy.visit(narucilacPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Narucilac');

    cy.get(`[data-cy="naziv"]`).type('magenta Awesome').should('have.value', 'magenta Awesome');

    cy.get(`[data-cy="racun"]`).type('open-source expedite indexing').should('have.value', 'open-source expedite indexing');

    cy.get(`[data-cy="telefon"]`).type('scale Boliviano').should('have.value', 'scale Boliviano');

    cy.get(`[data-cy="pib"]`).type('payment generating Franc').should('have.value', 'payment generating Franc');

    cy.get(`[data-cy="pdv"]`).type('withdrawal Brook program').should('have.value', 'withdrawal Brook program');

    cy.get(`[data-cy="odgovornoLiceNarucioca"]`).type('Central Hills THX').should('have.value', 'Central Hills THX');

    cy.get(`[data-cy="email"]`).type('Gregg_Lynch@yahoo.com').should('have.value', 'Gregg_Lynch@yahoo.com');

    cy.get(`[data-cy="adresa"]`).type('SDD Granite Locks').should('have.value', 'SDD Granite Locks');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', narucilacPageUrlPattern);
  });

  it('should delete last instance of Narucilac', function () {
    cy.visit(narucilacPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('narucilac').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', narucilacPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
