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

describe('Ponude e2e test', () => {
  const ponudePageUrl = '/ponude';
  const ponudePageUrlPattern = new RegExp('/ponude(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/ponudes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/ponudes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/ponudes/*').as('deleteEntityRequest');
  });

  it('should load Ponudes', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Ponude').should('exist');
    cy.url().should('match', ponudePageUrlPattern);
  });

  it('should load details Ponude page', function () {
    cy.visit(ponudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('ponude');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudePageUrlPattern);
  });

  it('should load create Ponude page', () => {
    cy.visit(ponudePageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponude');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudePageUrlPattern);
  });

  it('should load edit Ponude page', function () {
    cy.visit(ponudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponude');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudePageUrlPattern);
  });

  it('should create an instance of Ponude', () => {
    cy.visit(ponudePageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponude');

    cy.get(`[data-cy="sifraPonude"]`).type('40067').should('have.value', '40067');

    cy.get(`[data-cy="sifraPostupka"]`).type('367').should('have.value', '367');

    cy.get(`[data-cy="brojPartije"]`).type('16796').should('have.value', '16796');

    cy.get(`[data-cy="nazivProizvodjaca"]`).type('iterate deposit').should('have.value', 'iterate deposit');

    cy.get(`[data-cy="zasticeniNaziv"]`).type('cross-platform').should('have.value', 'cross-platform');

    cy.get(`[data-cy="ponudjenaVrijednost"]`).type('13034').should('have.value', '13034');

    cy.get(`[data-cy="rokIsporuke"]`).type('3825').should('have.value', '3825');

    cy.get(`[data-cy="datumPonude"]`).type('2021-09-04').should('have.value', '2021-09-04');

    cy.get(`[data-cy="sifraPonudjaca"]`).type('96124').should('have.value', '96124');

    cy.get(`[data-cy="selected"]`).should('not.be.checked');
    cy.get(`[data-cy="selected"]`).click().should('be.checked');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', ponudePageUrlPattern);
  });

  it('should delete last instance of Ponude', function () {
    cy.visit(ponudePageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('ponude').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ponudePageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
