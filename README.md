# Cucumber with Xray and Cypress

In order to run your tests and send the result to Xray test execution you should have the following env vars credentials on your .env file with:

```
CYPRESS_JIRA_USERNAME=
CYPRESS_JIRA_API_TOKEN=
CYPRESS_XRAY_CLIENT_ID=
CYPRESS_XRAY_CLIENT_SECRET=
CYPRESS_JIRA_PROJECT_KEY=RPF
```

You can use your e-mail as CYPRESS_JIRA_USERNAME, generate your CYPRESS_JIRA_API_TOKEN using the follow link https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/ and get CYPRESS_XRAY_CLIENT_ID and CYPRESS_XRAY_CLIENT_SECRET with the QA Team

The last step is run the tests passing your test execution key from Xray on Jira, you can pass this arg locally like the example above, adding the key to the
script command or having the env var CYPRESS_TEST_EXECUTION_KEY="RPF-1470" on your .env file.

Running:

```bash
npx cypress run
```

OR

```bash
npx cypress run upload:xray RPF-1470
```

Or you can just have in the .env file a test execution ticket key assigned to `CYPRESS_TEST_EXECUTION_KEY` like `CYPRESS_TEST_EXECUTION_KEY="RPF-1470"`
We also have should our tests with the tag before the scenario name `@TestName:<KEY_TEST>` example:

```
@TestName:RPF-RPF-1678
Scenario: RPF-1678 Checking the existing columns in active sessions page
```
