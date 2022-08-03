/// <reference types="cypress" />

describe('Verify the forgot password functionality of todo app', () => {
    beforeEach(() => {
        cy.visit('/forgotPassword')
    })

    it('Check when email fields is submitted empty', () => {
        cy.contains('Forgot your password ?').should('exist')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.error-messages').should('contain','Email is Required')
        cy.url().should('include', '/forgotPassword')
    })

    it.only('Check response when registered email is entered', () => {
        cy.get('#email').clear().type('t.user@email.com')
        cy.get('.btn').should('contain','Send').click()
    })

    it.only('Check when invalid email is entered', () => {
        cy.get('#email').clear().type('$#%@@email.com')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.error-messages').should('contain','Please Enter Valid Email')

        cy.get('#email').clear().type(' ')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.error-messages').should('contain','Please Enter Valid Email')

        cy.get('#email').clear().type('plaintext')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.error-messages').should('contain','Please Enter Valid Email')

        cy.get('#email').clear().type('@email.com')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.error-messages').should('contain','Please Enter Valid Email')

        cy.get('#email').clear().type('em@ailcom')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.error-messages').should('contain','Please Enter Valid Email')

    })

    it.only('Check response when unregistered email is entered', () => {
        cy.get('#email').clear().type('notreg@email.com')
        cy.get('.btn').should('contain','Send').click()
        cy.get('.message').should('contain','Email doesnot exist')
    })

    it.only('Check whether login link is working', () => {
        cy.get('.login-link').should('contain', 'Login').click()
        cy.url().should('include', '/login')
        cy.contains('login to your account').should('exist')
    })

    it.only('Check whether TODO APP link is working', () => {
        cy.get('h1').should('contain', 'TODO APP').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })

    it('Check response when all fields are entered with valid data', () => {
        cy.get('#email').clear().type('t.user@email.com')
        cy.get('#password').clear().type('Pass@1234')
        cy.get('.btn').should('contain','Login').should('not.be.disabled').click()
        cy.url().should('include', '/dashboard') //login does not work
        
    })

    it('Check response when registered email and invalid password are entered', () => {
        cy.get('#email').clear().type('t.user@email.com')
        cy.get('#password').clear().type('Pass@12345')
        cy.get('.btn').should('contain','Login').should('not.be.disabled').click()
        cy.get('.ng-submitted > :nth-child(1) > :nth-child(6)').should('contain', ' Incorrect Email Address !')
        cy.get(':nth-child(2) > :nth-child(7)').should('contain', 'Incorrect Password !')
        cy.url().should('not.include', '/dashboard')
        
    })

    it('Check response when unregistered email and valid password are entered', () => {
        cy.get('#email').clear().type('notreg@email.com')
        cy.get('#password').clear().type('Pass@1234')
        cy.get('.btn').should('contain','Login').should('not.be.disabled').click()
        cy.get('.ng-submitted > :nth-child(1) > :nth-child(6)').should('contain', ' Incorrect Email Address !')
        cy.get(':nth-child(2) > :nth-child(7)').should('contain', 'Incorrect Password !')
        cy.url().should('not.include', '/dashboard')
        
    })

    it('Check response when unregistered email and invalid password are entered', () => {
        cy.get('#email').clear().type('notreg@email.com')
        cy.get('#password').clear().type('Pass@12345')
        cy.get('.btn').should('contain','Login').should('not.be.disabled').click()
        cy.get('.ng-submitted > :nth-child(1) > :nth-child(6)').should('contain', ' Incorrect Email Address !')
        cy.get(':nth-child(2) > :nth-child(7)').should('contain', 'Incorrect Password !')
        cy.url().should('not.include', '/dashboard')
        
    })

    it('Check response when registered email is entered and password field is left empty', () => {
        cy.get('#email').clear().type('t.user@email.com')
        cy.get('.btn').should('contain','Login').should('be.disabled')
        cy.url().should('not.include', '/dashboard')
        
    })

    it('Check response when valid password is entered and email field is left empty', () => {
        cy.get('#password').clear().type('Pass@1234')
        cy.get('.btn').should('contain','Login').should('be.disabled')
        cy.url().should('not.include', '/dashboard')
        
    })

    it('Check whether forgot password link is working', () => {
        cy.get('.forgot-password').should('contain', 'Forgot Password?').click()
        cy.url().should('include', '/forgotPassword')
        cy.contains('Forgot your password ?').should('exist')
    })

    it('Check whether TODO APP link is working', () => {
        cy.get('h1').should('contain', 'TODO APP').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })
 
    it('Check whether user can access forgot password page with logged in account)', () => {
        cy.visit('/login')
        cy.login('t.user@email.com', 'Pass@1234')
        cy.visit('/forgotPassword')
        cy.url().should('not.include', '/forgotPassword')
    })


})
