/cypress/e2e/login_roles.cy.js

//Here we store the selectors to be used in the tests.
let bueBtn=
let contConEmailBtn=
let invitadoExternoBtn=

//left menu selectors
let inicioMenu=
let agendaMenu=
let tramitesMenu=
let documentosMenu=
let personasMenu=
let programasMenu=

//Home menu selector for every role.
//Pedagogico role
let iniciarTramiteBtn=
let nuevaConsultaBtn=
let instructivosBtn=
let irAAgendaBtn=

let iniciadosComponent=
let enSeguimientoComponent=
let pendientesComponent=


describe('Happy path login by using valid credentials according the role', () => {

  // TC for Admin role
  it('This should allow to the Admin login successfully', () => {
    cy.login('admin');
    
    // Here we validate that the login was successful and some asserts. 
    cy.url().should('include', '/dashboard'); 
    cy.contains('h1', 'Panel de Administración').should('be.visible');
    cy.contains('a', 'Gestionar Usuarios').should('be.visible');
  });

  // TC for Pedagogico rol
  it('This should allow to the Pedagogico role login successfully', () => {
    cy.login('editor');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/content');
    cy.contains('h1', 'Editor de Contenido').should('be.visible');
    cy.contains('button', 'Publicar').should('be.visible');
    cy.contains('button', 'Eliminar Usuario').should('not.exist');
  });

  // TC for Supervisor role
  it('Here we validate that the login was successful and some asserts.', () => {
    cy.login('viewer');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/public-content');
    cy.contains('h1', 'Contenido').should('be.visible');
    cy.contains('button', 'Publicar').should('not.exist');
    cy.contains('a', 'Gestionar Usuarios').should('not.exist');
  });

    // TC for Legal role
  it('Here we validate that the login was successful and some asserts.', () => {
    cy.login('viewer');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/public-content');
    cy.contains('h1', 'Contenido').should('be.visible');
    cy.contains('button', 'Publicar').should('not.exist');
    cy.contains('a', 'Gestionar Usuarios').should('not.exist');
  });

  /* Caso de prueba para credenciales inválidas (opcional, pero muy recomendado)
  it('Debe mostrar un mensaje de error con credenciales inválidas', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('invalid@email.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Validación de que el mensaje de error es visible
    cy.get('.error-message').should('be.visible').and('contain', 'Credenciales inválidas');
  });

  */

});
