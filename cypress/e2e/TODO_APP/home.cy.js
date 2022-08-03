/// <reference types="cypress" />


describe('Verify the reset password functionality of todo app', () => {
    beforeEach(() => {
        cy.visit('/home')
    })

    it('Check if user can access home page', () => {
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
        cy.get('[routerlink=""] > .mat-focus-indicator').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })

    it('Check if user can access dashborad page and reset password page by clicking respective button without logging in', () => {
        cy.get('[routerlink="/dashboard"] > .mat-focus-indicator').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please Login to Continue');
        });
        cy.url().should('not.include', '/dashboard')

        cy.visit('/home')        
        cy.get('[routerlink="/resetPassword"] > .mat-focus-indicator').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please Login to Continue');
        });
        cy.url().should('not.include', '/resetPassword')

    })

    it('Check if user can access dashboard and reset password page by clicking respective button with logged in account', () => {
        cy.visit('/login')
        cy.login('t.user@email.com', 'Pass@1234')

        cy.visit('/home')
        cy.get('[routerlink="/dashboard"] > .mat-focus-indicator').click()
        cy.url().should('include', '/dashboard')
        cy.contains('Overview').should('exist')

        cy.visit('/home')        
        cy.get('[routerlink="/resetPassword"] > .mat-focus-indicator').click()
        cy.url().should('include', '/resetPassword')
        cy.contains('Reset Password').should('exist')

    })

    it('Check if user can access login, signup and forgot password page by clicking respective buttons with logged in account', () => {
        cy.visit('/login')
        cy.login('t.user@email.com', 'Pass@1234')

        cy.visit('/home')
        cy.get('[routerlink="/login"] > .mat-focus-indicator').click()
        cy.url().should('not.include', '/login')

        cy.visit('/home')        
        cy.get('[routerlink="/signUp"] > .mat-focus-indicator').click()
        cy.url().should('not.include', '/signup')

        cy.visit('/home')        
        cy.get('[routerlink="/forgotPassword"] > .mat-focus-indicator').click()
        cy.url().should('not.include', '/forgotPassword')

    })

    it.only('Check if user can access login, signup and forgot password page by clicking respective buttons with out logging in', () => {
        cy.get('[routerlink="/login"] > .mat-focus-indicator').click()
        cy.url().should('include', '/login')

        cy.visit('/home')        
        cy.get('[routerlink="/signUp"] > .mat-focus-indicator').click()
        cy.url().should('include', '/signUp')

        cy.visit('/home')        
        cy.get('[routerlink="/forgotPassword"] > .mat-focus-indicator').click()
        cy.url().should('include', '/forgotPassword')

    })

})