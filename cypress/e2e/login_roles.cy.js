/cypress/e2e/login_roles.cy.js

const usuario = Cypress.env('username');
const contrasena = Cypress.env('password');

// Selectores para los tests
let bueBtn= '//*[@id="root"]/div/div[1]/div/div/div[2]/button'
let contConEmailBtn= '//*[@id="root"]/div/div[1]/div/div/div[2]/div[1]/button'
let homeText='//*[@id="root"]/div/div[1]/div/div/div[1]/h1'

// Home menu selector for every role.
// Pedagogico role
let iniciarTramiteBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div/div[1]'
let nuevaConsultaBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div/div[2]'
let instructivosBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div/div[3]'
let irAAgendaBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[2]/div[1]/button'

let iniciadosComponent= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[3]/div[1]/button'
let enSeguimientoComponent= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[3]/div[2]/button'
let pendientesComponent= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[3]/div[3]/button'

// Supervisor role
let tramitesARevisarTxt= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/h2'
let proxVisitasTxt= '//*[@id="root"]/div/main/div[2]/div[2]/div[2]/div[2]/div[1]/h1'
let irALaAgendaLink= '//*[@id="root"]/div/main/div[2]/div[2]/div[2]/div[2]/div[1]/span'
let agendarNuevaVisitaBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div[2]/div[2]/div[1]/button'

describe('Happy path login by using valid credentials according the role', () => {

  // TC for Admin role
  it('This should allow to the Admin login successfully', () => {
    cy.login('admin');
    cy.url().should('include', '/dashboard'); 
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('a', 'Gestionar Usuarios').should('be.visible');
  });

  // TC for Pedagogico rol
  it('This should allow to the Pedagogico role login successfully', () => {
    cy.visit('/login');
    cy.get('#username').type('pedagogico@maildrop.cc');
    cy.get('#password').type('Pedagogico2025');
    cy.get('form').submit();

    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('h1', 'Agenda').should('be.visible');
    cy.contains('button', 'Iniciar trámite').should('be.visible');
  });

  // TC negativo para Pedagógico: credenciales incorrectas
  it('No debe permitir login al rol Pedagógico con credenciales incorrectas', () => {
    cy.visit('/login');
    cy.get('#username').type('pedagogico@maildrop.cc');
    cy.get('#password').type('ClaveIncorrecta');
    cy.get('form').submit();

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Credenciales inválidas');
    cy.url().should('include', '/login');
  });

  // TC for Pedagogico rol without bue account
  it('This should allow to the Pedagogico role login successfully without BUE', () => {
    cy.visit('/login');
    cy.get('#username').type('pedagogico@maildrop.cc');
    cy.get('#password').type('Pedagogico2025');
    cy.get('form').submit();

    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('h1', 'Agenda').should('be.visible');
    cy.contains('button', 'Iniciar trámite').should('be.visible');
  });

  // TC for Supervisor role
  it('Here we validate that the login was successful and some asserts.', () => {
    cy.visit('/login');
    cy.get('#username').type('supervisor@maildrop.cc');
    cy.get('#password').type('Supervisor2025');
    cy.get('form').submit();

    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Trámites a revisar').should('be.visible');
    cy.contains('h1', 'Escuelas').should('be.visible');
    cy.contains('h1', 'Próximas visitas').should('be.visible');
  });

  // TC negativo para Supervisor: credenciales incorrectas
  it('No debe permitir login al rol Supervisor con credenciales incorrectas', () => {
    cy.visit('/login');
    cy.get('#username').type('supervisor@maildrop.cc');
    cy.get('#password').type('ClaveIncorrecta');
    cy.get('form').submit();

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Credenciales inválidas');
    cy.url().should('include', '/login');
  });

  // TC for Legal role
  it('Here we validate that the login was successful and some asserts.', () => {
    cy.login('legal');
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Contenido').should('be.visible');
    cy.contains('button', 'Publicar').should('not.exist');
    cy.contains('a', 'Gestionar Usuarios').should('not.exist');
  });

});
