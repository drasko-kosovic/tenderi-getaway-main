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

describe('HvalePonude e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load HvalePonudes', () => {
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('HvalePonude').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details HvalePonude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('hvalePonude');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create HvalePonude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('HvalePonude');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit HvalePonude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('HvalePonude');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of HvalePonude', () => {
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('HvalePonude');

    cy.get(`[data-cy="sifraPostupka"]`).type('27164').should('have.value', '27164');

    cy.get(`[data-cy="brojPartije"]`).type('80700').should('have.value', '80700');

    cy.get(`[data-cy="inn"]`)
      .type('compress product Grocery', { force: true })
      .invoke('val')
      .should('match', new RegExp('compress product Grocery'));

    cy.get(`[data-cy="farmaceutskiOblikLijeka"]`)
      .type('cross-media', { force: true })
      .invoke('val')
      .should('match', new RegExp('cross-media'));

    cy.get(`[data-cy="pakovanje"]`).type('Lock reboot plum', { force: true }).invoke('val').should('match', new RegExp('Lock reboot plum'));

    cy.get(`[data-cy="trazenaKolicina"]`).type('87308').should('have.value', '87308');

    cy.get(`[data-cy="procijenjenaVrijednost"]`).type('78751').should('have.value', '78751');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of HvalePonude', () => {
    cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/hvale-ponudes/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('hvale-ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('hvalePonude').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/hvale-ponudes*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('hvale-ponude');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
