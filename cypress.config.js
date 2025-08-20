const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://aprende-ba-staging.up.railway.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    
    setupNodeEvents(on, config) {
      
    },
  },
});