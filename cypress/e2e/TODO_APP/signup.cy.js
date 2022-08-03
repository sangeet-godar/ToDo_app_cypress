/// <reference types="cypress" />

describe('Verifying the first page of signup functionality of todo app', () => {
    beforeEach(() => {
        cy.visit('/signUp')
    })

    it('Check when all fields of first page of signup are submitted empty', () => {
        cy.contains(`Let's get started`).should('exist')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('exist')
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('exist')
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist')
        cy.get(':nth-child(4) > .error-messages > .invalid-text').should('exist')
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('exist')
        cy.url().should('include', '/signUp')
    })

    it('Check response when all fields are entered with valid data', () => {
        cy.get('#name').type('test user')
        cy.get('#mat-radio-2').click()
        cy.get('#mat-input-0').type('2/2/1999')
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').type('9876543210')
        cy.get('#email').type('t.user@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.url().should('include', '/signUp/setPassword')
    })

    it('Check response when all fields are entered with blank space', () => {
        cy.get('#name').type(' ')
        cy.get('#mat-input-0').type('  ')
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').type('  ')
        cy.get('#email').type('  ')
        cy.get('.btn').should('contain', 'Next').click()
        cy.url().should('not.include', '/signUp/setPassword')
    })

    it('Check response when name field is entered with numeric value, special character, alphanumeric value, less than 3 characters', () => {
        cy.get('#name').clear().type('4245')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain', 'Name can only contain letters')

        cy.get('#name').clear().type('@*#')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain', 'Name can only contain letters')

        cy.get('#name').clear().type('gwe56')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain', 'Name can only contain letters')

        cy.get('#name').clear().type('r3')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain', 'Enter Valid Name').should('contain', 'Name can only contain letters')
    })

    it('Check response when valid name is entered in name field', () => {
        cy.get('#name').clear().type('test user')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('not.exist')
    })

    it('Check for email when email is a simple plain text, without @ symbol, without . symbol, without domain, without username, without domain name, invalid username', () => {
        cy.get('#email').clear().type('testuser')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('testemail.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('test@emailcom')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('test@email.')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('test@.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('#..%$@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')

        cy.get('#email').clear().type('t@%r@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Email')
    })

    it('Check the response when valid email address is entered in email field', () => {
        cy.get('#email').clear().type('t.user@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('not.exist')
    })

    it('Check response when already signuped email address is used in email field', () => {
        cy.get('#email').clear().type('t.user@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(5) > .error-messages > .invalid-text').should('exist') //email already exist error message should be displayed
    })


    it('Check the response valid phone number is entered in phone  field', () => {
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').clear().type('9876543210')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(4) > .error-messages > .invalid-text').should('not.exist')
    })

    it('Check the response phone field is entered with more than 10 digits', () => {
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').clear().type('98765432104')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(4) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Phone')
    })

    it('Check the response phone field is entered with less than 10 digits', () => {
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').clear().type('932104784')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(4) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Phone')
    })

    it('Check the response when phone field is entered with only special characters of 10 digits', () => {
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').clear().type('+++--++---')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(4) > .error-messages > .invalid-text').should('contain', 'Please Enter Valid Phone') //only special character as phone should display error message
    })

    it('Check the response when valid date of birth is entered', () => {
        cy.get('#mat-input-0').type('2/2/1999')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('not.exist')
    })

    it('Check the response when future date of birth is entered', () => {
        cy.get('#mat-input-0').type('2/2/2120')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist') //future date cannot be date of birth
    })

    it('Check the response when date of birth field is entered with plain text, alphanumeric text, invalid date format, special characters', () => {
        cy.get('#mat-input-0').clear().type('evewkb')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB') //invalid date message should be shown

        cy.get('#mat-input-0').clear().type('f34rf')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB')

        cy.get('#mat-input-0').clear().type('%@#%@')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB')

        cy.get('#mat-input-0').clear().type('august 24, 1987')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB')

        cy.get('#mat-input-0').clear().type('f2ir5$#%445')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB')

        cy.get('#mat-input-0').clear().type('f2ir5$#%445')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB')

        cy.get('#mat-input-0').clear().type('13/18/2010')
        cy.get('.btn').should('contain', 'Next').click()
        cy.get(':nth-child(3) > .error-messages > .invalid-text').should('exist').should('contain', 'Please Enter Valid DOB')

    })

    it('Check whether login link for existing users is working', () => {
        cy.get('a').should('contain', 'Login').click()
        cy.url().should('include', '/login')
        cy.contains('login to your account').should('exist')
    })

    it('Check whether TODO APP link is working', () => {
        cy.get('h1').should('contain', 'TODO APP').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })

    it('Check whether user can access signup page with logged in account)', () => {
        cy.visit('/login')
        cy.login('t.user@email.com', 'Pass@1234')
        cy.visit('/signUp')
        cy.url().should('not.include', '/signUp')
    })

})


describe('Verifying the second page of signup functionality of todo app', () => {
    beforeEach(() => {
        cy.visit('/signUp')
        cy.contains(`Let's get started`).should('exist')
        cy.get('#name').type('test user')
        cy.get('#mat-radio-2').click()
        cy.get('#mat-input-0').type('2/2/1999')
        cy.get('.iti__selected-flag').click().get('#iti-0__item-np > .iti__country-name').click()
        cy.get('#phone').type('9876543210')
        cy.get('#email').type('t.username@email.com')
        cy.get('.btn').should('contain', 'Next').click()
        cy.url().should('include', '/signUp/setPassword')
        cy.contains('Set Your Password').should('exist')
    })

    it('Check when all input fields left empty', () => {
        cy.get('.btn').should('contain', 'Sign up').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check new password field with password less than 8 characters, without uppercase character, without number, without special character', () => {
        cy.get(':nth-child(1) > #password').clear().type('pass')
        cy.get(':nth-child(2) > #password').clear().type('pass')
        cy.get('.btn').should('contain', 'Sign up').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain','Must Be atleast 8 characters!').should('contain','Must contain atleast 1 number!').should('contain','Must contain atleast one uppercase character!').should('contain','Must contain atleast one special character!')
        cy.get(':nth-child(1) > .error-messages > .text-sucess').should('contain','Must contain atleast one lowercase character!')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check new password field with password less than 8 characters, without lowercase character, without number, without special character', () => {
        cy.get(':nth-child(1) > #password').clear().type('PASS')
        cy.get(':nth-child(2) > #password').clear().type('PASS')
        cy.get('.btn').should('contain', 'Sign up').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('contain','Must Be atleast 8 characters!').should('contain','Must contain atleast 1 number!').should('contain','Must contain atleast one lowercase character!').should('contain','Must contain atleast one special character!')
        cy.get(':nth-child(1) > .error-messages > .text-sucess').should('contain','Must contain atleast one uppercase character!')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check response when both input fields have same valid value',()=>{
        cy.get(':nth-child(1) > #password').clear().type('Pass@1234')
        cy.get(':nth-child(2) > #password').clear().type('Pass@1234')
        cy.get('.btn').should('contain', 'Sign up').click()
        cy.get(':nth-child(1) > .error-messages > .text-sucess').should('contain','Must contain atleast one uppercase character!').should('contain','Must Be atleast 8 characters!').should('contain','Must contain atleast 1 number!').should('contain','Must contain atleast one lowercase character!').should('contain','Must contain atleast one special character!')
        cy.get(':nth-child(2) > .error-messages > .text-sucess').should('contain','Password Must Match')
        cy.url().should('include', '/login') //assumed after signup, user gets redirected to login page
        cy.contains('Login to your account').should('exist')
    })
    
    it('Check response when both input fields are filled with blank spaces', () => {
        cy.get(':nth-child(1) > #password').clear().type('  ')
        cy.get(':nth-child(2) > #password').clear().type('  ')
        cy.get('.btn').should('contain', 'Sign up').click()
        cy.get(':nth-child(1) > .error-messages > .invalid-text').should('exist')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check response when both input fields have different value', () => {
        cy.get(':nth-child(1) > #password').clear().type('Pass@1234')
        cy.get(':nth-child(2) > #password').clear().type('Pass@12345')
        cy.get('.btn').should('contain', 'Sign up').click()
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('contain','Password Must Match')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password  invalid');
        });
    })

    it('Check whether login link for existing users is working', () => {
        cy.get('a').should('contain', 'Login').click()
        cy.url().should('include', '/login')
        cy.contains('login to your account').should('exist')
    })

    it('Check whether TODO APP link is working', () => {
        cy.get('h1').should('contain', 'TODO APP').click()
        cy.url().should('include', '/home')
        cy.contains('Home').should('exist')
    })


})

