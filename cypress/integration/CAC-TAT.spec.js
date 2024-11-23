/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";

describe('Central de atendimento ao Cliente TAT', () => {
    const user = {}
    beforeEach(() => {
        cy.visit('./src/index.html')

        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.text = faker.lorem.lines(2);
    })
    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.contains('span', 'Mensagem enviada com sucesso.').should('not.be.visible')
        cy.get('#firstName')
            .type(user.firstName)
            
        cy.get('#lastName')
            .type(user.lastName)
        
        cy.get('#email')
            .type(user.email)
        
        cy.get('#open-text-area')
            .type(user.text, { delay: 0 })

        cy.contains('button', 'Enviar').click()

        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.contains('span', 'Mensagem enviada com sucesso.').should('not.be.visible')

        cy.get('#firstName')
            .type(user.firstName)
            
        cy.get('#lastName')
            .type(user.lastName)
        
        cy.get('#email')
            .type(`@${user.firstName}`)
        
        cy.get('#open-text-area')
            .type(user.text, { delay: 0 })

        cy.contains('button', 'Enviar').click()

        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('telefone', () => {
        cy.get('#firstName')
            .type(user.firstName)
            
        cy.get('#lastName')
            .type(user.lastName)

        cy.get('#email')
            .type(user.email)

        cy.get('#phone')
            .type(99999999)
            
        cy.get('#open-text-area')
            .type(user.text, { delay: 0 })
            
            cy.get('#phone')
                .should('have.value', '99999999')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
            .type('fffff')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
        cy.get('#firstName')
            .type(user.firstName)
            
        cy.get('#lastName')
            .type(user.lastName)
        
        cy.get('#email')
            .type(user.email)

        cy.get('#phone-checkbox').check()
        
        cy.get('#open-text-area')
            .type(user.text, { delay: 0 })

        cy.contains('button', 'Enviar').click()
        
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type(user.firstName)
            .should('have.value', user.firstName)
            .clear()
            .should('have.value', '')
        
        cy.get('#lastName')
            .type(user.lastName)
            .should('have.value', user.lastName)
            .clear()
            .should('have.value', '')
        
        cy.get('#email')
            .type(user.email)
            .should('have.value', user.email)
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type(99999999)
            .should('have.value', 99999999)
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit(user)

    cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
    })
})