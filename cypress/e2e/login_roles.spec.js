/cypress/e2e/login_roles.cy.js

const usuario = Cypress.env('username');
const contrasena = Cypress.env('password');

//Here we store the selectors to be used in the tests------------------------------------------------------
let bueBtn= '//*[@id="root"]/div/div[1]/div/div/div[2]/button'
let contConEmailBtn= '//*[@id="root"]/div/div[1]/div/div/div[2]/div[1]/button'
//let invitadoExternoBtn=
let homeText='//*[@id="root"]/div/div[1]/div/div/div[1]/h1'



//left menu selectors
/*let inicioMenu= 
let agendaMenu=
let tramitesMenu=
let documentosMenu=
let personasMenu=
let programasMenu=
*/

//Home menu selector for every role.
//Pedagogico role
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
    
    // Here we validate that the login was successful and some asserts. 
    cy.url().should('include', '/dashboard'); 
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('a', 'Gestionar Usuarios').should('be.visible');
  });

  // TC for Pedagogico rol
  it('This should allow to the Pedagogico role login successfully', () => {
    cy.login('pedagogico');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('h1', 'Agenda').should('be.visible');
    cy.contains('button', 'Iniciar trámite').should('be.visible');
  });

    // TC for Pedagogico rol without bue account
  it('This should allow to the Pedagogico role login successfully without BUE', () => {
    cy.visit('/login')
    //cy.login('pedagogico');

    // Llena el campo de usuario usando la constante
    cy.get('#username').type(usuario);

    // Llena el campo de contraseña usando la constante
    cy.get('#password').type(contrasena);

    // Envía el formulario de login
    cy.get('form').submit();

    // Verifica que la URL haya cambiado después del login
    cy.url().should('include', '/dashboard');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('h1', 'Agenda').should('be.visible');
    cy.contains('button', 'Iniciar trámite').should('be.visible');
  });

  // TC for Supervisor role
  it('Here we validate that the login was successful and some asserts.', () => {
    cy.login('supervisor');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Trámites a revisar').should('be.visible');
    cy.contains('h1', 'Escuelas').should('be.visible');
    cy.contains('h1', 'Próximas visitas').should('be.visible');
  });

    // TC for Legal role
  it('Here we validate that the login was successful and some asserts.', () => {
    cy.login('legal');

    // Here we validate that the login was successful and some asserts.
    cy.url().should('include', '/dashboard');
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
