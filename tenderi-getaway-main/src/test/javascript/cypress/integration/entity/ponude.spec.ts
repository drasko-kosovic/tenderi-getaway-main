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

describe('Ponude e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Ponudes', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Ponude').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Ponude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('ponude');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Ponude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponude');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Ponude page', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Ponude');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Ponude', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Ponude');

    cy.get(`[data-cy="sifraPonude"]`).type('3546').should('have.value', '3546');

    cy.get(`[data-cy="sifraPostupka"]`).type('74641').should('have.value', '74641');

    cy.get(`[data-cy="brojPartije"]`).type('42172').should('have.value', '42172');

    cy.get(`[data-cy="nazivProizvodjaca"]`)
      .type('engineer Planner withdrawal', { force: true })
      .invoke('val')
      .should('match', new RegExp('engineer Planner withdrawal'));

    cy.get(`[data-cy="zasticeniNaziv"]`).type('Krone', { force: true }).invoke('val').should('match', new RegExp('Krone'));

    cy.get(`[data-cy="ponudjenaVrijednost"]`).type('34017').should('have.value', '34017');

    cy.get(`[data-cy="rokIsporuke"]`).type('22780').should('have.value', '22780');

    cy.get(`[data-cy="datumPonude"]`).type('2021-09-04').should('have.value', '2021-09-04');

    cy.get(`[data-cy="sifraPonudjaca"]`).type('39365').should('have.value', '39365');

    cy.get(`[data-cy="selected"]`).should('not.be.checked');
    cy.get(`[data-cy="selected"]`).click().should('be.checked');
    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Ponude', () => {
    cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequest');
    cy.intercept('DELETE', '/services/otvoreni/api/ponudes/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('ponude');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('ponude').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/services/otvoreni/api/ponudes*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('ponude');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
