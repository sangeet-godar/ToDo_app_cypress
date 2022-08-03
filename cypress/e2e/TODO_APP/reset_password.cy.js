/// <reference types="cypress" />


describe('Verify the reset password functionality of todo app', () => {
    beforeEach(() => {
       
        cy.login('t.user@email.com', 'Pass@1234')
        cy.visit('/resetPassword')

        //login doesnot work, so signup was used to access reset password page

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
        // cy.visit('/resetPassword')

    })

    it('Check when all input fields are left empty', () => {
        cy.contains('Reset Password').should('exist')
        cy.get('.btn').should('contain', 'Reset Password').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check new password field with password less than 8 characters, without uppercase character, without number, without special character', () => {
        cy.get(':nth-child(1) > #password').clear().type('pass')
        cy.get(':nth-child(2) > #password').clear().type('pass')
        cy.get('.btn').should('contain', 'Reset Password').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain','Must Be atleast 8 characters!').should('contain','Must contain atleast 1 number!').should('contain','Must contain atleast one uppercase character!').should('contain','Must contain atleast one special character!')
        cy.get(':nth-child(1) > .error-messages > .text-sucess').should('contain','Must contain atleast one lowercase character!')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check new password field with password less than 8 characters, without lowercase character, without number, without special character', () => {
        cy.get(':nth-child(1) > #password').clear().type('PASS')
        cy.get(':nth-child(2) > #password').clear().type('PASS')
        cy.get('.btn').should('contain', 'Reset Password').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain','Must Be atleast 8 characters!').should('contain','Must contain atleast 1 number!').should('contain','Must contain atleast one lowercase character!').should('contain','Must contain atleast one special character!')
        cy.get(':nth-child(1) > .error-messages > .text-sucess').should('contain','Must contain atleast one uppercase character!')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check response when both input fields have same valid value',()=>{
        cy.get(':nth-child(1) > #password').clear().type('Pass@1234')
        cy.get(':nth-child(2) > #password').clear().type('Pass@1234')
        cy.get('.btn').should('contain', 'Reset Password').click()
        cy.get(':nth-child(1) > .error-messages > .text-sucess').should('contain','Must contain atleast one uppercase character!').should('contain','Must Be atleast 8 characters!').should('contain','Must contain atleast 1 number!').should('contain','Must contain atleast one lowercase character!').should('contain','Must contain atleast one special character!')
        cy.get(':nth-child(2) > .error-messages > .text-sucess').should('contain','Password Must Match')
        
    })
    
    it('Check response when both input fields are filled with blank spaces', () => {
        cy.get(':nth-child(1) > #password').clear().type('  ')
        cy.get(':nth-child(2) > #password').clear().type('  ')
        cy.get('.btn').should('contain', 'Reset Password').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('exist')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check response when both input fields have different value', () => {
        cy.get(':nth-child(1) > #password').clear().type('Pass@1234')
        cy.get(':nth-child(2) > #password').clear().type('Pass@12345')
        cy.get('.btn').should('contain', 'Reset Password').click()
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('contain','Password Must Match')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })


    it('Check whether TODO APP link is working', () => {
        cy.get('h1').should('contain', 'TODO APP').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })

})

