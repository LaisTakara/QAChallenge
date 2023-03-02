import { defineParameterType } from "cypress-cucumber-preprocessor";

defineParameterType({
  name: "int",
  regexp: /(\d+)/,
  transformer: (value) => parseInt(value),
});

defineParameterType({
  name: "float",
  regexp: /(\d+\.\d+)/,
  transformer: (value) => parseFloat(value),
});

before(() => {
  cy.intercept('/api/login', (req) => {
    req.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';
  });
});
