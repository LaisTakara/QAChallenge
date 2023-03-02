const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "cypress-cucumber-preprocessor": {
    nonGlobalStepDefinitions: true,
    stepDefinitions: "cypress/integration/**/steps/*.js",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
