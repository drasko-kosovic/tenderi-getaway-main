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

describe('Narucilac e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Narucilacs', () => {
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Narucilac').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Narucilac page', () => {
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('narucilac');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Narucilac page', () => {
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Narucilac');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Narucilac page', () => {
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Narucilac');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Narucilac', () => {
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Narucilac');

    cy.get(`[data-cy="naziv"]`).type('Account Card Leu', { force: true }).invoke('val').should('match', new RegExp('Account Card Leu'));

    cy.get(`[data-cy="racun"]`)
      .type('Coordinator unleash', { force: true })
      .invoke('val')
      .should('match', new RegExp('Coordinator unleash'));

    cy.get(`[data-cy="telefon"]`)
      .type('Jan withdrawal middleware', { force: true })
      .invoke('val')
      .should('match', new RegExp('Jan withdrawal middleware'));

    cy.get(`[data-cy="pib"]`).type('payment', { force: true }).invoke('val').should('match', new RegExp('payment'));

    cy.get(`[data-cy="pdv"]`).type('Grocery matrices', { force: true }).invoke('val').should('match', new RegExp('Grocery matrices'));

    cy.get(`[data-cy="odgovornoLiceNarucioca"]`)
      .type('Gourde Ball', { force: true })
      .invoke('val')
      .should('match', new RegExp('Gourde Ball'));

    cy.get(`[data-cy="email"]`).type('Vilma79@gmail.com', { force: true }).invoke('val').should('match', new RegExp('Vilma79@gmail.com'));

    cy.get(`[data-cy="adresa"]`)
      .type('Monitored projection transitional', { force: true })
      .invoke('val')
      .should('match', new RegExp('Monitored projection transitional'));

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Narucilac', () => {
    cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/narucilacs/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('narucilac');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('narucilac').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/narucilacs*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('narucilac');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
