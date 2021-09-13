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

describe('HvalePonude e2e test', () => {
  const hvalePonudePageUrl = '/hvale-ponude';
  const hvalePonudePageUrlPattern = new RegExp('/hvale-ponude(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/hvale-ponudes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/hvale-ponudes/*').as('deleteEntityRequest');
  });

  it('should load HvalePonudes', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('HvalePonude').should('exist');
    cy.url().should('match', hvalePonudePageUrlPattern);
  });

  it('should load details HvalePonude page', function () {
    cy.visit(hvalePonudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('hvalePonude');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', hvalePonudePageUrlPattern);
  });

  it('should load create HvalePonude page', () => {
    cy.visit(hvalePonudePageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('HvalePonude');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', hvalePonudePageUrlPattern);
  });

  it('should load edit HvalePonude page', function () {
    cy.visit(hvalePonudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('HvalePonude');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', hvalePonudePageUrlPattern);
  });

  it('should create an instance of HvalePonude', () => {
    cy.visit(hvalePonudePageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('HvalePonude');

    cy.get(`[data-cy="sifraPostupka"]`).type('92325').should('have.value', '92325');

    cy.get(`[data-cy="brojPartije"]`).type('10839').should('have.value', '10839');

    cy.get(`[data-cy="inn"]`).type('function compress').should('have.value', 'function compress');

    cy.get(`[data-cy="farmaceutskiOblikLijeka"]`).type('Lithuanian').should('have.value', 'Lithuanian');

    cy.get(`[data-cy="pakovanje"]`).type('maximize Programmable').should('have.value', 'maximize Programmable');

    cy.get(`[data-cy="trazenaKolicina"]`).type('51081').should('have.value', '51081');

    cy.get(`[data-cy="procijenjenaVrijednost"]`).type('38836').should('have.value', '38836');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', hvalePonudePageUrlPattern);
  });

  it('should delete last instance of HvalePonude', function () {
    cy.visit(hvalePonudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('hvalePonude').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', hvalePonudePageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
