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

describe('Ponudjaci e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Ponudjacis', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Ponudjaci').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Ponudjaci page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('ponudjaci');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Ponudjaci page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponudjaci');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Ponudjaci page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Ponudjaci');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Ponudjaci', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponudjaci');

    cy.get(`[data-cy="nazivPonudjaca"]`).type('override', { force: true }).invoke('val').should('match', new RegExp('override'));

    cy.get(`[data-cy="odgovornoLice"]`)
      .type('Account Wyoming Mouse', { force: true })
      .invoke('val')
      .should('match', new RegExp('Account Wyoming Mouse'));

    cy.get(`[data-cy="adresaPonudjaca"]`)
      .type('infrastructures Quality', { force: true })
      .invoke('val')
      .should('match', new RegExp('infrastructures Quality'));

    cy.get(`[data-cy="bankaRacun"]`).type('copying', { force: true }).invoke('val').should('match', new RegExp('copying'));

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Ponudjaci', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/ponudjacis/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponudjaci');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('ponudjaci').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/ponudjacis*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('ponudjaci');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
