/// <reference types="cypress" />


describe('Verify the reset password functionality of todo app', () => {
    beforeEach(() => {
        

        cy.login('t.user@email.com', 'Pass@1234')
        cy.visit('/dashboard')

        //login doesnot work, signup was used to access dashboard page
        
        // cy.visit('/signUp')
        // cy.get('#name').type('test user')
        // cy.get('#mat-radio-2').click()
        // cy.get('#mat-input-0').type('2/2/1999')
        // cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        // cy.get('#phone').type('9876543210')
        // cy.get('#email').type('t.username@email.com')
        // cy.get('.btn').should('contain', 'Next').click()
        // cy.get(':nth-child(1) > #password').clear().type('Pass@1234')
        // cy.get(':nth-child(2) > #password').clear().type('Pass@1234')
        // cy.get('.btn').should('contain', 'Sign up').click()
        // cy.visit('/dashboard')

    })

    it('Check whether TODO APP link is working from dashboard page', () => {
        cy.url().should('include', '/dashboard')
        cy.contains('Overview').should('exist')
        cy.get('app-header > .d-flex > h1').should('contain', 'TODO APP').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })

})