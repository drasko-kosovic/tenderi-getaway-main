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

describe('Anex e2e test', () => {
  const anexPageUrl = '/anex';
  const anexPageUrlPattern = new RegExp('/anex(\\?.*)?$');
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
    cy.intercept('GET', '/services/otvoreni/api/anexes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/otvoreni/api/anexes').as('postEntityRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/anexes/*').as('deleteEntityRequest');
  });

  it('should load Anexes', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Anex').should('exist');
    cy.url().should('match', anexPageUrlPattern);
  });

  it('should load details Anex page', function () {
    cy.visit(anexPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityDetailsButtonSelector).first().click({ force: true });
    cy.getEntityDetailsHeading('anex');
    cy.get(entityDetailsBackButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', anexPageUrlPattern);
  });

  it('should load create Anex page', () => {
    cy.visit(anexPageUrl);
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Anex');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', anexPageUrlPattern);
  });

  it('should load edit Anex page', function () {
    cy.visit(anexPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        this.skip();
      }
    });
    cy.get(entityEditButtonSelector).first().click({ force: true });
    cy.getEntityCreateUpdateHeading('Anex');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.get(entityCreateCancelButtonSelector).click({ force: true });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', anexPageUrlPattern);
  });

  it('should create an instance of Anex', () => {
    cy.visit(anexPageUrl);
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Anex');

    cy.get(`[data-cy="sifra_postupka"]`).type('6665').should('have.value', '6665');

    cy.get(`[data-cy="sifra_ponude"]`).type('84156').should('have.value', '84156');

    cy.get(`[data-cy="atc"]`).type('Computers withdrawal Tasty').should('have.value', 'Computers withdrawal Tasty');

    cy.get(`[data-cy="inn"]`).type('Towels').should('have.value', 'Towels');

    cy.get(`[data-cy="zasticeni_naziv"]`).type('interfaces').should('have.value', 'interfaces');

    cy.get(`[data-cy="farmaceutski_oblik_lijeka"]`).type('View Rapid').should('have.value', 'View Rapid');

    cy.get(`[data-cy="jacina_lijeka"]`).type('Industrial').should('have.value', 'Industrial');

    cy.get(`[data-cy="pakovanje"]`).type('Liaison Tuna Product').should('have.value', 'Liaison Tuna Product');

    cy.get(`[data-cy="trazena_kolicina"]`).type('24272').should('have.value', '24272');

    cy.get(`[data-cy="procijenjena_vrijednost"]`).type('71269').should('have.value', '71269');

    cy.get(`[data-cy="rok_isporuke"]`).type('18300').should('have.value', '18300');

    cy.get(`[data-cy="naziv_ponudjaca"]`).type('Account Borders vertical').should('have.value', 'Account Borders vertical');

    cy.get(`[data-cy="naziv_proizvodjaca"]`).type('Bedfordshire PCI').should('have.value', 'Bedfordshire PCI');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.wait('@postEntityRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(201);
    });
    cy.wait('@entitiesRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.url().should('match', anexPageUrlPattern);
  });

  it('should delete last instance of Anex', function () {
    cy.visit(anexPageUrl);
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', response.body.length);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('anex').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', anexPageUrlPattern);
      } else {
        this.skip();
      }
    });
  });
});
