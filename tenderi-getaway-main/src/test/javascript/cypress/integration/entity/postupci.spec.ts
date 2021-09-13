import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Postupci e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Postupcis', () => {
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Postupci').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Postupci page', () => {
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('postupci');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Postupci page', () => {
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Postupci');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Postupci page', () => {
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Postupci');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Postupci', () => {
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Postupci');

    cy.get(`[data-cy="sifraPostupka"]`).type('23067').should('have.value', '23067');

    cy.get(`[data-cy="brojTendera"]`)
      .type('withdrawal Associate generating', { force: true })
      .invoke('val')
      .should('match', new RegExp('withdrawal Associate generating'));

    cy.get(`[data-cy="opisPostupka"]`)
      .type('Lead Cambridgeshire Outdoors', { force: true })
      .invoke('val')
      .should('match', new RegExp('Lead Cambridgeshire Outdoors'));

    cy.get(`[data-cy="vrstaPostupka"]`).type('rich', { force: true }).invoke('val').should('match', new RegExp('rich'));

    cy.get(`[data-cy="datumObjave"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(`[data-cy="datumOtvaranja"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Postupci', () => {
    cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/postupcis/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('postupci');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('postupci').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/postupcis*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('postupci');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
