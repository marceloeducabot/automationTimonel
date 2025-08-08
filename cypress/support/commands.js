// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

//Here we define a custom command for logging in users based on their roles.
// The user data is stored in a fixture file named 'users.json'.
Cypress.Commands.add('login', (role) => {
  // Input the users data from the fixture
  cy.fixture('users').then((users) => {
    const user = users[role];

    if (!user) {
      throw new Error(`El rol "${role}" no existe en el fixture de usuarios.`);
    }

    // Login access
    cy.visit('/login'); 

    // Interacting with the login form
    cy.get('input[name="email"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
  });
});