import { defineConfig } from "cypress";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
require("dotenv").config();
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
import { addXrayResultUpload, configureXrayPlugin, syncFeatureFile } from "cypress-xray-plugin";
import fix from "cypress-on-fix"

export default defineConfig({
  e2e: {
    env: {
    CYPRESS_baseUrl: "http://alb.127.0.0.1.nip.io:8080/"
    },
    async setupNodeEvents(on, config) {
      config.env.JIRA_USERNAME = process.env.CYPRESS_JIRA_USERNAME;
      config.env.JIRA_API_TOKEN = process.env.CYPRESS_JIRA_API_TOKEN;
      config.env.XRAY_CLIENT_ID = process.env.CYPRESS_XRAY_CLIENT_ID;
      config.env.XRAY_CLIENT_SECRET = process.env.CYPRESS_XRAY_CLIENT_SECRET;
      config.env.CYPRESS_TEST_EXECUTION_KEY = process.env.CYPRESS_TEST_EXECUTION_KEY;
      config.env.JIRA_PROJECT_KEY = process.env.CYPRESS_JIRA_PROJECT_KEY;

      const fixedOn = fix(on);
      await configureXrayPlugin(config, {
          plugin: {
            debug: true,
          },
          cucumber: {
            featureFileExtension: ".feature",
            uploadFeatures: true
          },
          jira: {
            projectKey: "RPF",
            url: "https://<MY_PROJECT>.atlassian.net",
            testExecutionIssueKey: process.env.CYPRESS_TEST_EXECUTION_KEY,
          },
          xray: {
            uploadResults: process.env.CYPRESS_TEST_EXECUTION_KEY !== '',
          },
      });

        await addCucumberPreprocessorPlugin(fixedOn, config);
          await addXrayResultUpload(fixedOn);
          fixedOn("file:preprocessor", async (file) => {
              await syncFeatureFile(file);
              const cucumberPlugin = createBundler({
                  plugins: [createEsbuildPlugin(config)],
              });
              return cucumberPlugin(file);
          });

        return config;   
    },
    specPattern: 'cypress/e2e/features/*.feature',
    retries: {
      runMode: 0,
      openMode: 0,
    },
    video: false
  }
});