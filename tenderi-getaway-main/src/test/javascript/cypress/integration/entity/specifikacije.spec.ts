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

describe('Specifikacije e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Specifikacijes', () => {
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Specifikacije').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Specifikacije page', () => {
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('specifikacije');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Specifikacije page', () => {
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Specifikacije');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Specifikacije page', () => {
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Specifikacije');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Specifikacije', () => {
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Specifikacije');

    cy.get(`[data-cy="sifraPostupka"]`).type('41690').should('have.value', '41690');

    cy.get(`[data-cy="brojPartije"]`).type('83442').should('have.value', '83442');

    cy.get(`[data-cy="atc"]`)
      .type('Visionary logistical', { force: true })
      .invoke('val')
      .should('match', new RegExp('Visionary logistical'));

    cy.get(`[data-cy="inn"]`).type('up', { force: true }).invoke('val').should('match', new RegExp('up'));

    cy.get(`[data-cy="farmaceutskiOblikLijeka"]`)
      .type('programming', { force: true })
      .invoke('val')
      .should('match', new RegExp('programming'));

    cy.get(`[data-cy="jacinaLijeka"]`).type('exploit', { force: true }).invoke('val').should('match', new RegExp('exploit'));

    cy.get(`[data-cy="jedinicaMjere"]`)
      .type('Fresh RSS Cambridgeshire', { force: true })
      .invoke('val')
      .should('match', new RegExp('Fresh RSS Cambridgeshire'));

    cy.get(`[data-cy="procijenjenaVrijednost"]`).type('94559').should('have.value', '94559');

    cy.get(`[data-cy="pakovanje"]`).type('Wooden Bolivia', { force: true }).invoke('val').should('match', new RegExp('Wooden Bolivia'));

    cy.get(`[data-cy="trazenaKolicina"]`).type('16212').should('have.value', '16212');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Specifikacije', () => {
    cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/specifikacijes/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('specifikacije');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('specifikacije').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/specifikacijes*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('specifikacije');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
