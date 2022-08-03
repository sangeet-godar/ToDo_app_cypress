/// <reference types="cypress" />

describe('Verifying the first page of signup functionality of todo app', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('Check when all fields of login page are submitted empty', () => {
        cy.contains('Login to your account').should('exist')
        cy.get('.btn').should('contain','Login').should('be.disabled')
        cy.url().should('include', '/login')
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

    it('Check whether user can access login page with logged in account)', () => {
        cy.login('t.user@email.com', 'Pass@1234')
        cy.visit('/login')
        cy.url().should('not.include', '/login')
    })



})
