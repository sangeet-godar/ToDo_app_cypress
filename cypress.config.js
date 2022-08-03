const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://flamboyant-allen-00cf47.netlify.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
