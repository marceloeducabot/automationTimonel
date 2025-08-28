//cypress/e2e/login_roles.cy.js

//const usuario = Cypress.env('username');
//const contrasena = Cypress.env('password');

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
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-testid="btn-login-email"] > [data-testid="button-label"]').click();
    cy.wait(1000);
  });

  // TC for Admin role
  it.skip('This should allow to the Admin login successfully', () => {
    cy.login('admin');
    cy.url().should('include', '/dashboard'); 
    cy.contains('h1', 'Actividades').should('be.visible');
    cy.contains('a', 'Gestionar Usuarios').should('be.visible');
  });

  // TC for Pedagogico rol
  it('This should allow to the Pedagogico role login successfully', () => {
    cy.get('[data-testid="input-email"]').type('pedagogico@maildrop.cc');
    cy.get('[data-testid="input-password"]').type('Pedagogico2025');
    cy.get('[data-testid="btn-submit-email"]').click();
    cy.wait(2000);

cy.visit('https://aprende-ba-staging.up.railway.app/dashboard');
cy.wait(2000);
    cy.url().should('include', '/dashboard');
    cy.get('.text-2xl').should('be.visible');
    cy.get('.text-xl').should('be.visible');
    cy.get('[data-testid="card"] > .grid > :nth-child(1)').should('be.visible');
  });

  // TC negativo para Pedagógico: credenciales incorrectas
  it('No debe permitir login al rol Pedagógico con credenciales incorrectas', () => {
    cy.get('[data-testid="input-email"]').type('pedagogico@maildrop.cc');
    cy.get('[data-testid="input-password"]').type('ClaveIncorrecta');
    cy.get('[data-testid="btn-submit-email"]').click();
    cy.wait(1000);
    cy.get('[data-testid="message-password-error"]').should('have.text', 'Contraseña incorrecta');

    
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
    
    
      // TC for Supervisor role
      it.only('Successful login for Supervisor role.', () => {
    cy.visit('/login');
    cy.get('[data-testid="btn-login-email"] > [data-testid="button-label"]').click();
    cy.wait(1000);  
    cy.get('[data-testid="input-email"]').type('supervisor@maildrop.cc');
    cy.get('[data-testid="input-password"]').type('Supervisor2025');
    cy.get('[data-testid="btn-submit-email"]').click();
    cy.wait(2000);

cy.visit('https://aprende-ba-staging.up.railway.app/dashboard');
cy.wait(2000);
    cy.url().should('include', '/dashboard');
    cy.get('.text-2xl').should('be.visible');
    cy.get('.text-xl').should('be.visible');
    cy.get('[data-testid="card"] > .grid > :nth-child(1)').should('be.visible');
      });
    
      // TC negativo para Supervisor: credenciales incorrectas
      it('No debe permitir login al rol Supervisor con credenciales incorrectas', () => {
    cy.get('[data-testid="input-email"]').type('supervisor@maildrop.cc');
    cy.get('[data-testid="input-password"]').type('ClaveIncorrecta');
    cy.get('[data-testid="btn-submit-email"]').click();
    cy.wait(1000);
    cy.get('[data-testid="message-password-error"]').should('have.text', 'Contraseña incorrecta');
      });
    
      // TC for Legal role
      it.skip('Here we validate that the login was successful and some asserts.', () => {
        cy.login('legal');
        cy.url().should('include', '/dashboard');
        cy.contains('h1', 'Contenido').should('be.visible');
        cy.contains('button', 'Publicar').should('not.exist');
        cy.contains('a', 'Gestionar Usuarios').should('not.exist');
      });
    
    });    //const usuario = Cypress.env('username');
    //const contrasena = Cypress.env('password');
    
    // Selectores para los tests
   // let bueBtn= '//*[@id="root"]/div/div[1]/div/div/div[2]/button'
    //let contConEmailBtn= '//*[@id="root"]/div/div[1]/div/div/div[2]/div[1]/button'
    //let homeText='//*[@id="root"]/div/div[1]/div/div/div[1]/h1'
    
    // Home menu selector for every role.
    // Pedagogico role
    //let iniciarTramiteBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div/div[1]'
    //let nuevaConsultaBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div/div[2]'
    //let instructivosBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/div/div/div[3]'
    //let irAAgendaBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[2]/div[1]/button'
    
    //let iniciadosComponent= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[3]/div[1]/button'
    //let enSeguimientoComponent= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[3]/div[2]/button'
    //let pendientesComponent= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[3]/div[3]/button'
    
    // Supervisor role
    //let tramitesARevisarTxt= '//*[@id="root"]/div/main/div[2]/div[2]/div/div[1]/div[1]/h2'
    //let proxVisitasTxt= '//*[@id="root"]/div/main/div[2]/div[2]/div[2]/div[2]/div[1]/h1'
    //let irALaAgendaLink= '//*[@id="root"]/div/main/div[2]/div[2]/div[2]/div[2]/div[1]/span'
    //let agendarNuevaVisitaBtn= '//*[@id="root"]/div/main/div[2]/div[2]/div[2]/div[2]/div[1]/button'
    
    

});
