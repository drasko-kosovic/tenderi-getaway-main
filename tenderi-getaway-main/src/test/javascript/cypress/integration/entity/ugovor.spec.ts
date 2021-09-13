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

describe('Ugovor e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Ugovors', () => {
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Ugovor').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Ugovor page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('ugovor');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Ugovor page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ugovor');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Ugovor page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Ugovor');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Ugovor', () => {
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ugovor');

    cy.get(`[data-cy="brojUgovora"]`)
      .type('Granite bus Washington', { force: true })
      .invoke('val')
      .should('match', new RegExp('Granite bus Washington'));

    cy.get(`[data-cy="datumUgovora"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(`[data-cy="brojOdluke"]`)
      .type('Optimization Palau', { force: true })
      .invoke('val')
      .should('match', new RegExp('Optimization Palau'));

    cy.get(`[data-cy="datumOdluke"]`).type('2021-09-06').should('have.value', '2021-09-06');

    cy.get(`[data-cy="iznosUgovoraBezPdf"]`).type('99719').should('have.value', '99719');

    cy.get(`[data-cy="sifraPostupka"]`).type('53676').should('have.value', '53676');

    cy.get(`[data-cy="sifraPonude"]`).type('64713').should('have.value', '64713');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Ugovor', () => {
    cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/ugovors/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ugovor');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('ugovor').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/ugovors*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('ugovor');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
