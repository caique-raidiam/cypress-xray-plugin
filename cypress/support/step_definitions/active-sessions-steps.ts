/// <reference types="cypress" />

import {When, Then, DataTable} from '@badeball/cypress-cucumber-preprocessor';


When('I navigate to the active sessions page', () => {
    expect(true).to.be.true
})

Then('The system should show me the following columns', (dataTable: DataTable) => {
    expect(true).to.be.true
})