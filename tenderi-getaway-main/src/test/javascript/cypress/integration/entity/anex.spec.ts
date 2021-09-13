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

describe('Anex e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Anexes', () => {
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Anex').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Anex page', () => {
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('anex');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Anex page', () => {
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Anex');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Anex page', () => {
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Anex');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Anex', () => {
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Anex');

    cy.get(`[data-cy="sifra_postupka"]`).type('39917').should('have.value', '39917');

    cy.get(`[data-cy="sifra_ponude"]`).type('48908').should('have.value', '48908');

    cy.get(`[data-cy="atc"]`).type('disintermediate', { force: true }).invoke('val').should('match', new RegExp('disintermediate'));

    cy.get(`[data-cy="inn"]`).type('Integration', { force: true }).invoke('val').should('match', new RegExp('Integration'));

    cy.get(`[data-cy="zasticeni_naziv"]`).type('array', { force: true }).invoke('val').should('match', new RegExp('array'));

    cy.get(`[data-cy="farmaceutski_oblik_lijeka"]`)
      .type('grid-enabled', { force: true })
      .invoke('val')
      .should('match', new RegExp('grid-enabled'));

    cy.get(`[data-cy="jacina_lijeka"]`)
      .type('Iowa incentivize embrace', { force: true })
      .invoke('val')
      .should('match', new RegExp('Iowa incentivize embrace'));

    cy.get(`[data-cy="pakovanje"]`).type('Franc', { force: true }).invoke('val').should('match', new RegExp('Franc'));

    cy.get(`[data-cy="trazena_kolicina"]`).type('9531').should('have.value', '9531');

    cy.get(`[data-cy="procijenjena_vrijednost"]`).type('61774').should('have.value', '61774');

    cy.get(`[data-cy="rok_isporuke"]`).type('54671').should('have.value', '54671');

    cy.get(`[data-cy="naziv_ponudjaca"]`)
      .type('Direct Salad Checking', { force: true })
      .invoke('val')
      .should('match', new RegExp('Direct Salad Checking'));

    cy.get(`[data-cy="naziv_proizvodjaca"]`)
      .type('port withdrawal', { force: true })
      .invoke('val')
      .should('match', new RegExp('port withdrawal'));

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Anex', () => {
    cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/anexes/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('anex');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('anex').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/anexes*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('anex');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
